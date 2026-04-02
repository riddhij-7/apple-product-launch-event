"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  })

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now
      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days:    Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

// ── Single-card Flip ───────────────────────────────────────────────────────────
function FlipCard({ value, label }: { value: number; label: string }) {
  const [displayed, setDisplayed] = useState(value)
  const [next, setNext]           = useState(value)
  const [flipping, setFlipping]   = useState(false)

  useEffect(() => {
    if (value === displayed) return
    setNext(value)
    setFlipping(true)
    const t = setTimeout(() => {
      setDisplayed(value)
      setFlipping(false)
    }, 400)
    return () => clearTimeout(t)
  }, [value])

  const fmt = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flip-unit">
      <div className="scene">
        {/* The target number (already in place) */}
        <div className="card back">
          <span>{fmt(next)}</span>
        </div>

        {/* The current number that flips away */}
        <div className={`card front ${flipping ? 'flipping' : ''}`}>
          <span>{fmt(displayed)}</span>
        </div>
      </div>

      <p className="flip-label">{label}</p>

      <style jsx>{`
        .flip-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .scene {
          position: relative;
          width: 110px;
          height: 130px;
          perspective: 600px;
        }

        @media (max-width: 640px) {
          .scene { width: 76px; height: 92px; }
        }

        .card {
          position: absolute;
          inset: 0;
          border-radius: 10px;
          background: #1c1c1e;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.07),
            0 8px 32px rgba(0,0,0,0.8);
          overflow: hidden;
        }

        .card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.05) 0%,
            transparent 50%
          );
          pointer-events: none;
        }

        .card span {
          font-family: 'Courier New', Courier, monospace;
          font-size: clamp(44px, 6vw, 68px);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -2px;
          line-height: 1;
          position: relative;
          z-index: 1;
        }

        .card.front {
          z-index: 2;
          transform-origin: 50% 50%;
        }

        .card.front.flipping {
          animation: appleFlip 0.45s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
        }

        @keyframes appleFlip {
          0% {
            transform: rotateX(0deg);
            filter: brightness(1);
          }
          40% {
            filter: brightness(0.4);
          }
          50% {
            transform: rotateX(-90deg);
            opacity: 1;
          }
          51% {
            opacity: 0;
          }
          100% {
            transform: rotateX(-180deg);
            opacity: 0;
          }
        }

        /* Back Card Animation (Incoming) */
        .card.back {
          z-index: 1;
        }

        .card.back.incoming {
          animation: popIn 0.45s ease-out forwards;
        }

        @keyframes popIn {
          0% {
            transform: scale(0.92);
            filter: brightness(0.3);
          }
          100% {
            transform: scale(1);
            filter: brightness(1);
          }
        }

        /* Center hinge line */
        .scene::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 0; right: 0;
          height: 1.5px;
          background: rgba(0,0,0,0.6);
          z-index: 10;
          transform: translateY(-50%);
        }


        /* Center hinge line */
        .scene::after {
          content: '';
          position: absolute;
          top: 50%;
          left: -5px; right: -5px;
          height: 2px;
          background: #000;
          z-index: 10;
          transform: translateY(-50%);
          pointer-events: none;
        }

        .flip-label {
          font-family: 'Courier New', Courier, monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin: 0;
        }
      `}</style>
    </div>
  )
}

function Separator() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'block' }} />
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'block' }} />
    </div>
  )
}

const EVENT_DATE = new Date('2026-04-07T17:00:00')

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)

  const ctaRef       = useRef<HTMLElement>(null)
  const glowRef      = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  const timeLeft = useCountdown(EVENT_DATE)

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`
        glowRef.current.style.top  = `${e.clientY}px`
      }
    }

    const createParticle = () => {
      if (!particlesRef.current) return
      const p = document.createElement('div')
      const size = Math.random() * 2 + 0.5
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%; bottom:-10px;
        position:absolute; border-radius:50%;
        background:rgba(255,255,255,0.6);
        animation: floatP ${Math.random() * 12 + 8}s linear forwards;
        opacity:${Math.random() * 0.5 + 0.1};
        pointer-events:none;
      `
      particlesRef.current.appendChild(p)
      setTimeout(() => p.remove(), 20000)
    }

    const style = document.createElement('style')
    style.textContent = `
      @keyframes floatP {
        0%   { transform: translateY(0) scale(0.5); opacity: 0; }
        10%  { opacity: 1; }
        90%  { opacity: 0.5; }
        100% { transform: translateY(-100vh) scale(1.2); opacity: 0; }
      }
    `
    document.head.appendChild(style)

    window.addEventListener('mousemove', handleMouseMove)
    const interval = setInterval(createParticle, 600)
    for (let i = 0; i < 20; i++) createParticle()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCtaVisible(true) },
      { threshold: 0.2 }
    )
    if (ctaRef.current) observer.observe(ctaRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
        <div
          ref={glowRef}
          className="fixed w-[400px] h-[400px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)' }}
        />
        <div ref={particlesRef} className="absolute inset-0 z-0 pointer-events-none" />

        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
          <video autoPlay muted loop playsInline
            className="w-[60%] max-w-[900px] h-auto object-contain opacity-60">
            <source src="/videos/apple-hero.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
          <h1
            className="font-bold tracking-tight text-white mb-4 leading-none"
            style={{
              fontSize: 'clamp(56px, 10vw, 120px)',
              opacity:   mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s',
            }}
          >
            Apple Event
          </h1>
          <p
            className="text-white/90 mb-3 font-light"
            style={{
              fontSize: 'clamp(16px, 3vw, 28px)',
              opacity:   mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.9s ease 0.28s, transform 0.9s ease 0.28s',
            }}
          >
            Get ready for what's next<br />
            <span className="neo-smooth">Experience neo.</span>
          </p>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          style={{ opacity: mounted ? 1 : 0, transition: 'opacity 1s ease 1s' }}
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </section>

      <section
        ref={ctaRef}
        className="bg-black py-24 flex flex-col items-center gap-14"
        style={{
          opacity:   ctaVisible ? 1 : 0,
          transform: ctaVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-white/30 text-[10px] tracking-[6px] uppercase font-mono">
            April 7 · 5:00 PM
          </p>
          <h2
            className="text-white font-bold tracking-[8px] uppercase text-center neo-smooth"
            style={{ fontSize: 'clamp(20px, 4vw, 36px)', }}
          >
            Coming Soon
          </h2>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <FlipCard value={timeLeft.days}    label="Days"    />
          <Separator />
          <FlipCard value={timeLeft.hours}   label="Hours"   />
          <Separator />
          <FlipCard value={timeLeft.minutes} label="Minutes" />
          <Separator />
          <FlipCard value={timeLeft.seconds} label="Seconds" />
        </div>

        <p className="text-white/25 text-xs tracking-widest text-center max-w-xs font-mono px-4">
         
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/rsvp"
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Reserve your seat
          </Link>
          <Link
            href="/macbook-neo"
            className="px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Learn more
          </Link>
        </div>
      </section>
    </>
  )
}