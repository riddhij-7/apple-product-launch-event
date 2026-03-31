import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  Event: [
    { label: 'Home',        href: '/' },
    { label: 'Agenda',      href: '/agenda' },
    { label: 'Speakers',    href: '/speakers' },
    { label: 'Live Stream', href: '/live' },
    { label: 'RSVP',        href: '/rsvp' },
  ],
  Products: [
    { label: 'All Products', href: '/products' },
  ],
  Community: [
    { label: 'Influencers', href: '/influencers' },
    { label: 'Past Events', href: '/products#past-events' },
  ],
}

const socialLinks = [
  { label: 'X',         href: 'https://x.com/apple' },
  { label: 'YouTube',   href: 'https://youtube.com/apple' },
  { label: 'Instagram', href: 'https://instagram.com/apple' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-black mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* logo + social */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-1">
            <Image
                src="/images/apple-logo.png"
                alt="Apple logo"
                width={25}
                height={25}
            />
            <p className="text-white font-semibold text-sm tracking-wide mb-1">
            MacBook Neo
            </p>
            </Link>
            <p className="text-white/40 py-3 text-xs">
              The most powerful MacBook ever made.
            </p>
          </div>

          {/* Social links */}
            <div className="flex items-center gap-6">
            {socialLinks.map((s) => (
                <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white text-sm transition-colors duration-200"
                >
                {s.label}
                </a>
            ))}
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-4">
                {category}
              </p>
              <ul className="flex flex-col gap-3 list-none">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            Copyright © {year} Apple Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              Terms of Use
            </Link>
            <Link href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}