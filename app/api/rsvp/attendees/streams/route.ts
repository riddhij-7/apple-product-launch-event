// app/api/rsvp/attendees/stream/route.ts

import { NextRequest } from 'next/server'
import { addSubscriber, removeSubscriber } from '../broadcaster'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      addSubscriber(controller)

      const keepAlive = setInterval(() => {
        try {
          controller.enqueue(': ping\n\n')
        } catch {
          clearInterval(keepAlive)
        }
      }, 25_000)

      req.signal.addEventListener('abort', () => {
        clearInterval(keepAlive)
        removeSubscriber(controller)
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type':  'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection':    'keep-alive',
    },
  })
}