// app/api/rsvp/attendees/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { broadcast } from './broadcaster'

// ─── MongoDB singleton — NO serverApi/strict so all commands work ─────────────
let client: MongoClient | null = null

async function getClient(): Promise<MongoClient> {
  if (client) return client
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set in .env.local')
  // Do NOT pass serverApi here — strict mode blocks commands like distinct/aggregate $group
  client = new MongoClient(uri)
  await client.connect()
  return client
}

const DB   = process.env.MONGODB_DB   || 'apple-neo'
const COLL = process.env.MONGODB_COLL || 'attendees'

// ─── Geocode city → lat/lng via Nominatim (free, no API key) ─────────────────
async function geocode(city: string, country: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const q   = encodeURIComponent(`${city}, ${country}`)
    const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`
    const res = await fetch(url, {
      headers: { 'User-Agent': 'AppleMacBookNeoEvent/1.0' },
    })
    if (!res.ok) return null
    const data = await res.json()
    if (!data?.[0]) return null
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
  } catch (e) {
    console.error('[geocode]', e)
    return null
  }
}

// ─── GET /api/rsvp/attendees ──────────────────────────────────────────────────
export async function GET() {
  try {
    const mongo = await getClient()
    const col   = mongo.db(DB).collection(COLL)

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    // Run all queries in parallel
    const [total, todayCount, citiesAgg, latest] = await Promise.all([

      // 1. Total attendee count
      col.countDocuments(),

      // 2. Joined today
      col.countDocuments({ createdAt: { $gte: todayStart } }),

      // 3. Per-city aggregation for map dots
      //    Also collect distinct countries inside same pipeline to avoid distinct()
      col.aggregate([
        {
          $group: {
            _id:     '$city',
            count:   { $sum: 1 },
            lat:     { $first: '$lat' },
            lng:     { $first: '$lng' },
            country: { $first: '$country' },
          },
        },
        { $match: { lat: { $ne: null }, lng: { $ne: null } } },
        { $sort:  { count: -1 } },
        { $limit: 300 },
      ]).toArray(),

      // 4. Latest 6 for live feed
      col
        .find({}, { projection: { name: 1, city: 1, country: 1 } })
        .sort({ createdAt: -1 })
        .limit(6)
        .toArray(),
    ])

    // Count distinct countries from the cities aggregation (no extra DB call)
    const distinctCountries = new Set(citiesAgg.map(c => c.country).filter(Boolean))

    return NextResponse.json({
      total,
      todayCount,
      countries: distinctCountries.size,
      cities:    citiesAgg.length,
      cityData:  citiesAgg.map(c => ({
        n:   c._id   as string,
        lat: c.lat   as number,
        lng: c.lng   as number,
        c:   c.count as number,
      })),
      feed: latest.map(r =>
        `${r.name} from ${r.city}${r.country ? ', ' + r.country : ''} just joined`
      ),
    })
  } catch (err: any) {
    console.error('[GET /api/rsvp/attendees]', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// ─── POST /api/rsvp/attendees ─────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body                                            = await req.json()
    const { name, email, city, country, phone, company, ticketType } = body

    if (!name || !email || !city || !country) {
      return NextResponse.json(
        { error: 'name, email, city, and country are required' },
        { status: 400 }
      )
    }

    // 1. Geocode
    const coords = await geocode(city, country)
    if (!coords) {
      return NextResponse.json(
        { error: `Could not geocode "${city}, ${country}". Check the city name.` },
        { status: 422 }
      )
    }

    // 2. Save to MongoDB
    const mongo  = await getClient()
    const col    = mongo.db(DB).collection(COLL)
    const result = await col.insertOne({
      name,
      email,
      city,
      country,
      lat:        coords.lat,
      lng:        coords.lng,
      phone:      phone      ?? null,
      company:    company    ?? null,
      ticketType: ticketType ?? 'general',
      createdAt:  new Date(),
    })

    // 3. Push to all open map SSE connections
    broadcast({
      name,
      city,
      country,
      lat: coords.lat,
      lng: coords.lng,
      id:  result.insertedId.toString(),
    })

    return NextResponse.json(
      { success: true, insertedId: result.insertedId, lat: coords.lat, lng: coords.lng },
      { status: 201 }
    )
  } catch (err: any) {
    console.error('[POST /api/rsvp/attendees]', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}