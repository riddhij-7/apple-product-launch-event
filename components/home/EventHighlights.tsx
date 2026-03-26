import Link from 'next/link'

const highlights = [
  {
    label: 'Date',
    value: 'April 7',
    sub: '2026',
  },
  {
    label: 'Time',
    value: '6:00 PM',
    sub: 'IST',
  },
  {
    label: 'Venue',
    value: 'Apple Park',
    sub: 'Cupertino, CA',
  },
  {
    label: 'Format',
    value: 'Live + Stream',
    sub: 'Global access',
  },
]

export default function EventHighlights() {
  return (
    <section className="bg-black py-10 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <p className="text-white/100 text-xs tracking-widest uppercase mb-6 text-center">
          Apple Event
        </p>

        
        <h2 className="text-white text-center font-semibold leading-tight mb-20"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
        >
          One day. One product.<br />
          <span className="text-white/30">Everything changes.</span>
        </h2>
        
        {/* Highlights grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="bg-black px-8 py-10 flex flex-col gap-2 hover:bg-white/5 transition-colors duration-300"
            >
              <span className="text-white/30 text-xs uppercase tracking-widest">
                {item.label}
              </span>
              <span className="text-white font-semibold text-2xl md:text-3xl">
                {item.value}
              </span>
              <span className="text-white/40 text-sm">
                {item.sub}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Link href="/agenda">
            <div className="mt-10 flex justify-center group cursor-pointer">
              <span className="text-white text-lg font-medium flex items-center gap-2 transition-all duration-300 group-hover:gap-4">
                View Full Agenda
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        </div>

      </div>
    </section>
  )
}