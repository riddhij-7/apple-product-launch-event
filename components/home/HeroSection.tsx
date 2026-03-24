"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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

const EVENT_DATE = new Date('2026-04-07T18:00:00')

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const ctaRef = useRef<HTMLElement>(null)
  const timeLeft = useCountdown(EVENT_DATE)

  useEffect(() => {
    setMounted(true)
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
      {/*  Hero section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">

        {/* Background image */}

        <div className="absolute inset-x-0 bottom-0 top-[52px] z-0">
          <Image
            src="/images/display.jpg"
            alt="MacBook Neo"
            fill
            className="object-cover object-center opacity-60"
            priority
            style={{
            objectPosition: 'center 30%',  
    }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        </div>

         {/* Background video  
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
        <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            style={{
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scale(0.6)',       
            transformOrigin: 'center center',
            width: '86%',    

            }}
        >
            <source src="/videos/apple-hero.mp4" type="video/mp4" />
            <source src="/videos/apple-hero.webm" type="video/webm" />
        </video>
        </div>
        */}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">

          {/* Headline */}
          <h1
            className="font-bold tracking-tight text-white mb-4 leading-none"
            style={{
              fontSize: 'clamp(56px, 10vw, 120px)',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s',
            }}
          >
            MacBook <span className="neo-smooth">Neo.</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-white/90 mb-3 font-light"
            style={{
              fontSize: 'clamp(16px, 3vw, 28px)',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.9s ease 0.28s, transform 0.9s ease 0.28s',
            }}
          >
            The most powerful MacBook ever made.
          </p>

        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 1s ease 1s',
          }}
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>

      </section>

      {/* BELOW HERO: countdown + CTAs  */}
      <section
        ref={ctaRef}
        className="bg-black py-24 flex flex-col items-center gap-12"
        style={{
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* Countdown */}
        <div className="flex items-center gap-4 md:gap-8">
          {[
            { label: 'Days',    value: timeLeft.days },
            { label: 'Hours',   value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((unit, i) => (
            <div key={unit.label} className="flex items-center gap-4 md:gap-8">
              <div className="flex flex-col items-center">
                <div className="bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 md:px-6 md:py-4 min-w-[64px] md:min-w-[80px]">
                  <span className="block text-white font-semibold text-2xl md:text-4xl tabular-nums text-center">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-white/30 text-xs mt-2 uppercase tracking-widest">
                  {unit.label}
                </span>
              </div>
              {i < 3 && (
                <span className="text-white/20 text-2xl md:text-3xl font-light mb-5">:</span>
              )}
            </div>
          ))}
        </div>

        {/* CTAs */}
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