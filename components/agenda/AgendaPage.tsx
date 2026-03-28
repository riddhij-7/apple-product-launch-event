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
  keynote:    { label: "Keynote",    color: "#f4a7b9", glow: "rgba(244,167,185,0.2)" },
  product:    { label: "Product",    color: "#f5e642", glow: "rgba(245,230,66,0.2)"  },
  demo:       { label: "Live Demo",  color: "#7aa7d2", glow: "rgba(122,167,210,0.2)" },
  break:      { label: "Break",      color: "#c8c8c8", glow: "rgba(200,200,200,0.15)"},
  networking: { label: "Networking", color: "#ffffff", glow: "rgba(255,255,255,0.12)"},
}

const typeColorResolved = {
  keynote:    "#f4a7b9",
  product:    "#f5e642",
  demo:       "#7aa7d2",
  break:      "#c8c8c8",
  networking: "#ffffff",
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
  const resolvedColor = typeColorResolved[session.type]

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0px)" : "translateX(-28px)",
        transition: `opacity 0.45s ease ${index * 0.07}s, transform 0.6s cubic-bezier(0.34,1.5,0.64,1) ${index * 0.07}s`,
      }}
      className="relative flex gap-5 md:gap-7 group"
    >
      {/* Left column: time + dot + line */}
      <div className="flex flex-col items-center w-24 flex-shrink-0 pt-1">
        <div className="text-right w-full mb-2">
          <span className="text-xs font-semibold block" style={{ color: "#ffffff" }}>
            {session.time}
          </span>
          <span className="text-[10px]" style={{ color: "#6e6e73" }}>
            {session.duration}
          </span>
        </div>
        <div
          className="rounded-full flex-shrink-0"
          style={{
            width: session.highlight ? 8 : 6,
            height: session.highlight ? 8 : 6,
            background: session.highlight ? resolvedColor : "transparent",
            border: "1.5px solid " + resolvedColor,
            boxShadow: session.highlight ? "0 0 8px " + cfg.glow : "none",
            transform: inView ? "scale(1)" : "scale(0.5)",
            transition: "transform 0.5s cubic-bezier(0.25,0.1,0.25,1) " + (index * 0.08 + 0.2) + "s",
            marginTop: 2,
          }}
        />
        <div
          className="w-px mt-2 flex-1 min-h-6"
          style={{ background: `linear-gradient(to bottom, ${resolvedColor}40, transparent)` }}
        />
      </div>

      {/* Card */}
      <div
        onClick={onToggle}
        className="flex-1 mb-4 rounded-2xl cursor-pointer overflow-hidden"
        style={{
          background: session.highlight
            ? "#1e1e1e"
            : "#161616",
          border: "1px solid " + (session.highlight ? resolvedColor + "44" : "rgba(255,255,255,0.07)"),
          transform: expanded ? "scale(1.01) translateX(3px)" : "scale(1) translateX(0)",
          boxShadow: expanded ? "0 12px 40px " + cfg.glow : "none",
          transition: "all 0.45s cubic-bezier(0.34,1.4,0.64,1)",
        }}
        onMouseEnter={(e) => {
          if (!expanded) {
            e.currentTarget.style.borderColor = resolvedColor + "55"
            e.currentTarget.style.background = "#1e1e1e"
            e.currentTarget.style.transform = "scale(1.01) translateX(2px)"
          }
        }}
        onMouseLeave={(e) => {
          if (!expanded) {
            e.currentTarget.style.borderColor = session.highlight ? resolvedColor + "44" : "rgba(255,255,255,0.07)"
            e.currentTarget.style.background = session.highlight ? "#1e1e1e" : "#161616"
            e.currentTarget.style.transform = "scale(1) translateX(0)"
          }
        }}
      >
        {/* Highlight top glow line */}
        {session.highlight && (
          <div
            className="h-px w-full"
            style={{ background: `linear-gradient(90deg, transparent, ${resolvedColor}, transparent)` }}
          />
        )}

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">

              {/* Type badge */}
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-2"
                style={{
                  background: resolvedColor + "18",
                  color: resolvedColor,
                  border: "1px solid " + resolvedColor + "30",
                }}
              >
                {cfg.label}
              </span>

              {/* Title */}
              <h3
                className="font-semibold leading-snug mb-1"
                style={{
                  fontSize: "clamp(14px, 2vw, 16px)",
                  color: session.highlight ? "#ffffff" : "#a1a1a6",
                }}
              >
                {session.title}
              </h3>

              {/* Speaker / role */}
              {session.speaker ? (
                <p className="text-xs" style={{ color: "#6e6e73" }}>
                  {session.speaker}
                  {session.role && (
                    <span style={{ color: "rgba(255,255,255,0.15)" }}> · {session.role}</span>
                  )}
                </p>
              ) : session.role ? (
                <p className="text-xs" style={{ color: "#6e6e73" }}>{session.role}</p>
              ) : null}
            </div>

            {/* Chevron */}
            <div
              style={{
                color: "#6e6e73",
                transition: "transform 0.4s cubic-bezier(0.25,0.1,0.25,1)",
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

          {/* Expanded description */}
          <div
            style={{
              maxHeight: expanded ? "300px" : "0",
              opacity: expanded ? 1 : 0,
              overflow: "hidden",
              transition: "max-height 0.5s cubic-bezier(0.25,0.1,0.25,1), opacity 0.35s ease",
            }}
          >
            <p
              className="text-sm leading-relaxed mt-4 pt-4"
              style={{
                color: "#a1a1a6",
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}
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
    <main
      className="min-h-screen overflow-x-hidden"
      style={{ background: "#000000", color: "#ffffff", padding: "40px 24px 60px" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ── Hero ── */}
        <section className="text-center pb-10">
          <p
            className="text-xs tracking-[0.25em] uppercase font-semibold mb-4"
            style={{
              color: "#6e6e73",
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
              fontSize: "clamp(48px, 9vw, 92px)",
              color: "#ffffff",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.25,0.1,0.25,1) 0.2s",
            }}
          >
            Event Agenda
          </h1>
        </section>

        {/* ── Filter pills ── */}
        <div
          className="flex justify-center gap-2 flex-wrap mb-4"
          style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.8s ease 0.4s" }}
        >
          {filters.map((f) => {
            const isActive = activeFilter === f
            const resolvedColor = f === "all" ? "#ffffff" : typeColorResolved[f as keyof typeof typeColorResolved]
            const glow = f === "all" ? "rgba(255,255,255,0.12)" : typeConfig[f as keyof typeof typeConfig]?.glow
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
                  background: isActive ? resolvedColor : "#1a1a1a",
                  color: isActive ? "#000" : "#a1a1a6",
                  border: "1px solid " + (isActive ? resolvedColor : "rgba(255,255,255,0.07)"),
                  transform: isActive ? "scale(1.04)" : "scale(1)",
                  boxShadow: isActive ? "0 4px 18px " + glow : "none",
                  transition: "all 0.35s cubic-bezier(0.25,0.1,0.25,1)",
                  cursor: "pointer",
                }}
              >
                {f === "all" ? "All sessions" : typeConfig[f as keyof typeof typeConfig]?.label}
              </button>
            )
          })}
        </div>

        {/* ── Legend ── */}
        <div
          className="flex justify-center gap-5 flex-wrap mb-12"
          style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.8s ease 0.5s" }}
        >
          {Object.entries(typeConfig).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div
                className="rounded-full"
                style={{ width: 6, height: 6, background: typeColorResolved[key as keyof typeof typeColorResolved] }}
              />
              <span className="text-[11px]" style={{ color: "#6e6e73" }}>{val.label}</span>
            </div>
          ))}
        </div>

        {/* ── Sessions list ── */}
        <section>
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

      </div>
    </main>
  )
}
