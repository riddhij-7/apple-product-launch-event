import RSVPForm from '@/components/rsvp/RsvpForms'

export const metadata = {
  title: 'RSVP',
  description: 'Reserve your seat at the Apple MacBook Neo launch event.',
}

export default function RSVPPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6 width">
      <div className="w-full px-8">

        {/* Page header */}
        <div className="text-center mb-16">
          <h1 className="text-white font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(32px, 6vw, 52px)' }}
          >
            RSVP for the Apple MacBook Neo Launch Event
          </h1>
        </div>

        {/* Form */}
        <RSVPForm />

      </div>
    </main>
  )
}