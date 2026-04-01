// app/api/rsvp/attendees/broadcaster.ts

const subscribers = new Set<ReadableStreamDefaultController>()

export function addSubscriber(ctrl: ReadableStreamDefaultController): void {
  subscribers.add(ctrl)
}

export function removeSubscriber(ctrl: ReadableStreamDefaultController): void {
  subscribers.delete(ctrl)
}

export function broadcast(payload: object): void {
  const data = `data: ${JSON.stringify(payload)}\n\n`
  for (const ctrl of subscribers) {
    try {
      ctrl.enqueue(data)
    } catch {
      subscribers.delete(ctrl)
    }
  }
}