"use client"

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home',        href: '/' },
  { label: 'Agenda',      href: '/agenda' },
  { label: 'Speakers',    href: '/speakers' },
  { label: 'Influencers', href: '/influencers' },
  { label: 'Products',    href: '/products' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
      style={{ height: 'var(--nav-height)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
        <Image
          src="/images/apple-logo.png"  
          alt="apple-logo"
          width={30}
          height={30}
        />
    
        </Link>
        
        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-white font-medium'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* RSVP button + mobile menu trigger */}
        <div className="flex items-center gap-4">
          <Link
            href="/rsvp"
            className="hidden md:inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors duration-200"
          >
            RSVP Now
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-4">
          <ul className="flex flex-col gap-4 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm block transition-colors ${
                    pathname === link.href
                      ? 'text-white font-medium'
                      : 'text-white/60'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/rsvp"
                onClick={() => setMenuOpen(false)}
                className="inline-flex bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-full"
              >
                RSVP Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}