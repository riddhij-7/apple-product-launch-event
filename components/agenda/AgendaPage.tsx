"use client"

import { useState, useEffect, useRef } from "react"

type Session = {
  time: string
  duration: string
  title: string
  speaker: string
  role: string
  type: "keynote" | "product" | "demo" | "break" | "networking"
  description: string
  highlight?: boolean
  icon: string
}

const sessions: Session[] = [
  { time: "5:00 PM", duration: "60 min", title: "Doors Open & Registration", speaker: "Apple Event Staff", role: "Check-in & Welcome", type: "networking", icon: "◈", description: "Arrive early to pick up your event badge, explore the pre-event showcase, and mingle with fellow attendees. Light refreshments available." },
  { time: "6:00 PM", duration: "25 min", title: "Opening Keynote", speaker: "Tim Cook", role: "CEO, Apple", type: "keynote", highlight: true, icon: "◆", description: "Tim Cook sets the stage for an unforgettable evening, reflecting on Apple's journey and teasing what's next for the MacBook line." },
  { time: "6:25 PM", duration: "30 min", title: "Introducing MacBook Neo", speaker: "John Ternus", role: "SVP Hardware Engineering", type: "product", highlight: true, icon: "◉", description: "The world's first look at MacBook Neo — its design philosophy, breakthrough silicon, and what the most powerful MacBook ever really means." },
  { time: "6:55 PM", duration: "20 min", title: "macOS Next: Smarter, Faster, Together", speaker: "Craig Federighi", role: "SVP Software Engineering", type: "product", icon: "◉", description: "Craig walks through the new macOS experience powering MacBook Neo — real-time AI features, a rebuilt Spotlight, and deep hardware-software integration." },
  { time: "7:15 PM", duration: "15 min", title: "Designing the Impossible", speaker: "Jony Ive", role: "Former Chief Design Officer", type: "keynote", icon: "◆", description: "A rare appearance by design legend Jony Ive, sharing the principles behind MacBook Neo's iconic form and the obsessive details that make it extraordinary." },
  { time: "7:30 PM", duration: "20 min", title: "Live Demo: MacBook Neo in Action", speaker: "Craig Federighi", role: "SVP Software Engineering", type: "demo", highlight: true, icon: "▶", description: "Watch MacBook Neo tackle real-world tasks in real time from 8K video editing to on-device AI inference. No slides. No tricks." },
  { time: "7:50 PM", duration: "20 min", title: "Break & Hands-On Experience", speaker: "", role: "Product Stations Open", type: "break", icon: "○", description: "Step away from the stage and step into the future. MacBook Neo is available to touch, test, and experience at stations throughout the venue." },
  { time: "8:10 PM", duration: "15 min", title: "MacBook Neo for Creators", speaker: "Steve Wozniak", role: "Co-founder, Apple", type: "product", icon: "◉", description: "Wozniak shares his perspective on how MacBook Neo opens new creative frontiers — from engineering to music, film, and art." },
  { time: "8:25 PM", duration: "20 min", title: "Q&A: Ask the Team", speaker: "Tim Cook & Team", role: "Live Q&A", type: "networking", icon: "◈", description: "Submit your questions live. Tim Cook, Craig Federighi, and John Ternus answer the most burning questions about MacBook Neo." },
  { time: "8:45 PM", duration: "75 min", title: "Networking & Closing Reception", speaker: "", role: "Apple Park Courtyard", type: "networking", icon: "◈", description: "The evening winds down with drinks, music, and the chance to connect with speakers, engineers, and fellow Apple enthusiasts." },
]

const typeConfig = {
  keynote:    { label: "Keynote",    color: "#0071e3", glow: "rgba(0,113,227,0.3)" },
  product:    { label: "Product",    color: "#30d158", glow: "rgba(48,209,88,0.3)" },
  demo:       { label: "Live Demo",  color: "#ff9f0a", glow: "rgba(255,159,10,0.3)" },
  break:      { label: "Break",      color: "#636366", glow: "rgba(99,99,102,0.2)" },
  networking: { label: "Networking", color: "#bf5af2", glow: "rgba(191,90,242,0.3)" },
}

const filters = ["all", "keynote", "product", "demo", "networking"]

function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, inView }
}

function SessionCard({ session, index, expanded, onToggle }: { session: Session; index: number; expanded: boolean; onToggle: () => void }) {
  const { ref, inView } = useInView()
  const cfg = typeConfig[session.type]

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0px)" : "translateX(-28px)",
        transition: `opacity 0.45s ease ${index * 0.07}s, transform 0.6s cubic-bezier(0.34,1.5,0.64,1) ${index * 0.07}s`,
      }}
      className="relative flex gap-4 md:gap-6 group"
    >
      {/* Left column: time + icon + line */}
      <div className="flex flex-col items-center w-20 flex-shrink-0 pt-1">
        <div className="text-right w-full mb-2">
          <span className="text-xs font-semibold block" style={{ color: "#f5f5f7" }}>{session.time}</span>
          <span className="text-[10px]" style={{ color: "#6e6e73" }}>{session.duration}</span>
        </div>
        <div
          className="rounded-full flex-shrink-0"
          style={{
            width: session.highlight ? 8 : 6,
            height: session.highlight ? 8 : 6,
            background: session.highlight ? cfg.color : "transparent",
            border: "1.5px solid " + cfg.color,
            boxShadow: session.highlight ? "0 0 8px " + cfg.glow : "none",
            transform: inView ? "scale(1)" : "scale(0.5)",
            transition: "transform 0.5s cubic-bezier(0.25,0.1,0.25,1) " + (index * 0.08 + 0.2) + "s, box-shadow 0.3s ease",
            marginTop: 2,
          }}
        />
        <div
          className="w-px mt-2 flex-1 min-h-6"
          style={{ background: "linear-gradient(to bottom, " + cfg.color + "50, transparent)" }}
        />
      </div>

      {/* Card */}
      <div
        onClick={onToggle}
        className="flex-1 mb-5 rounded-2xl cursor-pointer overflow-hidden"
        style={{
          background: session.highlight
            ? "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)"
            : "rgba(255,255,255,0.03)",
          border: "1px solid " + (session.highlight ? cfg.color + "44" : "rgba(255,255,255,0.07)"),
          transform: expanded ? "scale(1.01) translateX(3px)" : "scale(1) translateX(0)",
          boxShadow: expanded ? "0 12px 40px " + cfg.glow : "none",
          transition: "all 0.45s cubic-bezier(0.34,1.4,0.64,1)",
        }}
        onMouseEnter={(e) => {
          if (!expanded) {
            e.currentTarget.style.borderColor = cfg.color + "66"
            e.currentTarget.style.transform = "scale(1.01) translateX(2px)"
          }
        }}
        onMouseLeave={(e) => {
          if (!expanded) {
            e.currentTarget.style.borderColor = session.highlight ? cfg.color + "44" : "rgba(255,255,255,0.07)"
            e.currentTarget.style.transform = "scale(1) translateX(0)"
          }
        }}
      >
        {session.highlight && (
          <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, " + cfg.color + ", transparent)" }} />
        )}

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-2"
                style={{ background: cfg.color + "1a", color: cfg.color, border: "1px solid " + cfg.color + "33" }}
              >
                {cfg.label}
              </span>
              <h3
                className="font-semibold leading-snug mb-1"
                style={{ fontSize: "clamp(14px, 2vw, 17px)", color: session.highlight ? "#f5f5f7" : "#d1d1d6" }}
              >
                {session.title}
              </h3>
              {session.speaker ? (
                <p className="text-xs" style={{ color: "#6e6e73" }}>
                  {session.speaker}
                  {session.role && <span style={{ color: "#48484a" }}> · {session.role}</span>}
                </p>
              ) : session.role ? (
                <p className="text-xs" style={{ color: "#6e6e73" }}>{session.role}</p>
              ) : null}
            </div>
            <div
              style={{
                color: "#636366",
                transition: "transform 0.5s cubic-bezier(0.25,0.1,0.25,1)",
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                flexShrink: 0,
                marginTop: 4,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div
            style={{
              maxHeight: expanded ? "300px" : "0",
              opacity: expanded ? 1 : 0,
              overflow: "hidden",
              transition: "max-height 0.5s cubic-bezier(0.25,0.1,0.25,1), opacity 0.4s ease",
            }}
          >
            <p
              className="text-sm leading-relaxed mt-4 pt-4"
              style={{ color: "#8e8e93", borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              {session.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AgendaPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [expanded, setExpanded] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [listVisible, setListVisible] = useState(true)
  const [displayFilter, setDisplayFilter] = useState("all")

  useEffect(() => { setTimeout(() => setMounted(true), 60) }, [])

  const filtered = displayFilter === "all" ? sessions : sessions.filter((s) => s.type === displayFilter)

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-8 py-4 sticky top-0 z-50"
        style={{
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* Apple logo */}
        <svg width="18" height="22" viewBox="0 0 814 1000" fill="white">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 376.7 0 248.4 0 126.4c0-70 25-140.9 71.9-189.1C121.6 86 175.3 60 232.8 60c72.1 0 118.7 43.8 166.7 43.8 46.5 0 101.1-46.5 174.5-46.5 27.9 0 109.4 2.6 168.5 80.1zm-225.1-151.7c33.1-39.5 55.8-94.5 55.8-149.5 0-7.7-.6-15.4-1.9-22.4-52.6 1.9-114.9 35-152.8 79.4-31.4 36.7-58 91.7-58 147.4 0 8.3 1.3 16.6 1.9 19.2 3.2.6 8.4 1.3 13.6 1.3 47.4 0 106.5-31.4 141.4-75.4z"/>
        </svg>

        {/* Nav links */}
        <div className="flex items-center gap-8">
          {["Home", "MacBook Neo", "Agenda", "Speakers", "Influencers", "Products"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm"
              style={{
                color: item === "Agenda" ? "#f5f5f7" : "#6e6e73",
                fontWeight: item === "Agenda" ? 600 : 400,
                transition: "color 0.2s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => { if (item !== "Agenda") (e.currentTarget as HTMLElement).style.color = "#d1d1d6" }}
              onMouseLeave={(e) => { if (item !== "Agenda") (e.currentTarget as HTMLElement).style.color = "#6e6e73" }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* RSVP button */}
        <a
          href="/rsvp"
          className="px-5 py-2 rounded-full text-sm font-semibold"
          style={{
            background: "#0071e3",
            color: "#fff",
            textDecoration: "none",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#0077ed"
            ;(e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,113,227,0.5)"
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#0071e3"
            ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
          }}
        >
          RSVP Now
        </a>
      </nav>

      {/* Hero */}
      <section className="px-8 pt-16 pb-12 text-center">
        <p
          className="text-xs tracking-[0.25em] uppercase font-semibold mb-5"
          style={{
            color: "#0071e3",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          April 7, 2026 · Apple Park · Cupertino, CA
        </p>

        <h1
          className="font-bold tracking-tight leading-none"
          style={{
            fontSize: "clamp(52px, 10vw, 96px)",
            color: "#f5f5f7",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.25,0.1,0.25,1) 0.2s",
          }}
        >
          Event Agenda
        </h1>
      </section>

      {/* Filter pills */}
      <div
        className="flex justify-center gap-2 flex-wrap px-6 mb-5"
        style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.8s ease 0.65s" }}
      >
        {filters.map((f) => {
          const isActive = activeFilter === f
          const color = f === "all" ? "#ffffff" : typeConfig[f as keyof typeof typeConfig]?.color
          const glow = f === "all" ? "rgba(255,255,255,0.15)" : typeConfig[f as keyof typeof typeConfig]?.glow
          return (
            <button
              key={f}
              onClick={() => {
                if (f === activeFilter) return
                setListVisible(false)
                setTimeout(() => {
                  setActiveFilter(f)
                  setDisplayFilter(f)
                  setExpanded(null)
                  setListVisible(true)
                }, 260)
              }}
              className="px-5 py-2 rounded-full text-xs font-bold capitalize"
              style={{
                background: isActive ? color : "rgba(255,255,255,0.05)",
                color: isActive ? "#000" : "#a1a1a6",
                border: "1px solid " + (isActive ? color : "rgba(255,255,255,0.1)"),
                transform: isActive ? "scale(1.04)" : "scale(1)",
                boxShadow: isActive ? "0 4px 20px " + glow : "none",
                transition: "all 0.35s cubic-bezier(0.25,0.1,0.25,1)",
              }}
            >
              {f === "all" ? "All sessions" : typeConfig[f as keyof typeof typeConfig]?.label}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-5 flex-wrap px-6 mb-16">
        {Object.entries(typeConfig).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: val.color }} />
            <span className="text-[11px]" style={{ color: "#6e6e73" }}>{val.label}</span>
          </div>
        ))}
      </div>

      {/* Sessions */}
      <section className="max-w-2xl mx-auto px-6 pb-24">
        <div
          style={{
            opacity: listVisible ? 1 : 0,
            transform: listVisible ? "translateX(0px)" : "translateX(32px)",
            transition: "opacity 0.26s ease, transform 0.55s cubic-bezier(0.34,1.5,0.64,1)",
          }}
          className="flex flex-col"
        >
          {filtered.map((session, i) => (
            <SessionCard
              key={session.time + session.title}
              session={session}
              index={i}
              expanded={expanded === i}
              onToggle={() => setExpanded(expanded === i ? null : i)}
            />
          ))}
        </div>

      </section>
    </main>
  )
}
