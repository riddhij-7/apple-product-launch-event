import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Rsvp from '@/lib/models/Rsvp'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, ticketType, company } = body

    
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    await connectDB()


    const existing = await Rsvp.findOne({ email })
    if (existing) {
      return NextResponse.json(
        { error: 'This email has already registered' },
        { status: 409 }
      )
    }

    const rsvp = await Rsvp.create({
      name,
      email,
      phone,
      ticketType: ticketType || 'general',
      company,
    })

    return NextResponse.json(
      { success: true, id: rsvp._id },
      { status: 201 }
    )

  } catch (error: any) {
    console.error('RSVP error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}


export async function GET() {
  try {
    await connectDB()
    const rsvps = await Rsvp.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ rsvps })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch RSVPs' },
      { status: 500 }
    )
  }
}