"use client"
const tiers = [
  {
    id: "general",
    name: "General",
    price: "Free",
    desc: "Main auditorium",
    badge: null,
    accent: "#7aa7d2",
    bg: "#000000",
    blobs: [
      { cx: 100, cy: 60, rx: 120, ry: 80, fill: "#7aa7d2", op:0.7 },
    ],
    perks: ["Keynote access", "Product hands-on", "Event kit"],
    btnBg: "#ffffff",
    btnColor: "#7aa7d2",
  },
  {
    id: "press",
    name: "Press",
    price: "Free",
    desc: "Media & journalists",
    badge: "Media",
    accent: "#f4a7b9",
    bg: "#000000",
    blobs: [
      { cx: 100, cy: 60, rx: 120, ry: 80, fill: "#f4a7b9", op:0.7 },
    ],
    perks: ["Priority seating", "Press lounge", "Exclusive briefing", "Media kit"],
    btnBg: "#ffffff",
    btnColor: "#f4a7b9",
  },
  {
    id: "influencer",
    name: "Influencer",
    price: "Free",
    desc: "Creator access",
    badge: "Creator",
    accent: "#f5e642",
    bg: "#000000",
    blobs: [
      { cx: 100, cy: 60, rx: 120, ry: 80, fill: "#f5e642", op:0.8 },
    ],
    perks: ["Influencer Arena", "Early hands-on", "Creator kit", "Meet & greet"],
    btnBg: "#ffffff",
    btnColor: "#000",
  },
  {
    id: "vip",
    name: "VIP",
    price: "Invite only",
    desc: "Executive front row",
    badge: "VIP",
    accent: "#c8c8c8",
    bg: "#000000",
    blobs: [
      { cx: 100, cy: 60, rx: 120, ry: 80, fill: "#c8c8c8", op:0.7 },
    ],
    perks: ["Front row", "Executive dinner", "Early product access"],
    btnBg: "#ffffff",
    btnColor: "#333",
  },
]
type Blob = { cx: number; cy: number; rx: number; ry: number; fill: string; op: number }

function NeoHeader({ blobs, bg, gradientId }: { blobs: Blob[]; bg: string; gradientId: string }) {
  return (
    <svg viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <rect width="260" height="160" fill={bg} />
      {blobs.map((b, i) => (
        <ellipse key={i} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fill={b.fill} opacity={b.op} />
      ))}
      <rect width="260" height="40" y="120" fill={`url(#${gradientId})`} />
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bg} stopOpacity="0" />
          <stop offset="100%" stopColor={bg} stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function PerfRow({ bg }: { bg: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", height: 20, background: bg, flexShrink: 0 }}>
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#1a1a1a", flexShrink: 0, marginLeft: -9, zIndex: 3 }} />
      <div style={{ flex: 1, borderTop: "1.5px dashed rgba(255,255,255,0.15)", margin: "0 2px" }} />
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#1a1a1a", flexShrink: 0, marginRight: -9, zIndex: 3 }} />
    </div>
  )
}

interface Props {
  selected: string
  onSelect: (id: string) => void
}

export default function TicketTiers({ selected, onSelect }: Props) {
  return (
    <div style={{ display: "grid", 
    gridTemplateColumns: "repeat(4, 1fr)",
     gap: 16, 
     width: "100%",
     minWidth: 0,}}>
      {tiers.map((tier) => {
        const isSelected = selected === tier.id
        return (
          <div
            key={tier.id}
            onClick={() => onSelect(tier.id)}
            style={{
              borderRadius: 16, overflow: "visible", cursor: "pointer",
              position: "relative", display: "flex", flexDirection: "column",
              filter: isSelected ? `drop-shadow(0 8px 24px ${tier.accent}44)` : "drop-shadow(0 4px 16px rgba(0,0,0,0.4))",
              transform: isSelected ? "translateY(-6px)" : "translateY(0)",
              transition: "transform 0.2s, filter 0.2s",
            }}
          >
            {isSelected && (
              <div style={{ position: "absolute", inset: -2, borderRadius: 18, border: `2px solid ${tier.accent}`, pointerEvents: "none", zIndex: 4 }} />
            )}
            <div style={{ borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", flex: 1 }}>

              {/* Header */}
              <div style={{ height: 160, position: "relative", overflow: "hidden", flexShrink: 0 }}>
                <NeoHeader blobs={tier.blobs} bg={tier.bg} gradientId={`grad-${tier.id}`} />
                {tier.badge && (
                  <span style={{ position: "absolute", top: 10, right: 10, zIndex: 2, fontSize: 9, fontWeight: 700, padding: "3px 7px", borderRadius: 20, textTransform: "uppercase" as const, letterSpacing: "0.06em", background: `${tier.accent}22`, color: tier.accent, border: `1px solid ${tier.accent}44` }}>
                    {tier.badge}
                  </span>
                )}
                <div style={{ position: "absolute", bottom: 12, left: 14, zIndex: 2 }}>
                  <span style={{ fontSize: 20, fontWeight: 800, color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,0.5)", display: "block", lineHeight: 1 }}>{tier.name}</span>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", fontWeight: 500, marginTop: 2, display: "block" }}>{tier.price}</span>
                </div>
              </div>

              <PerfRow bg={tier.bg} />

              {/* Body */}
              <div style={{ flex: 1, padding: "14px 14px 12px", background: tier.bg, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Event",  value: "Apple Launch Event 2026", color: "rgb(255, 255, 255)" },
                  { label: "Date",   value: "Apr 7, 2026",     color: "rgb(255, 255, 255)" },
                  { label: "Access", value: tier.desc,         color: tier.accent },
                ].map((f) => (
                  <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)" }}>{f.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: f.color }}>{f.value}</span>
                  </div>
                ))}
                <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                  {tier.perks.map((perk) => (
                    <div key={perk} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
                      <div style={{ width: 14, height: 14, borderRadius: 3, background: `${tier.accent}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="8" height="8" viewBox="0 0 8 8">
                          <path d="M1 4l2 2 4-4" stroke={tier.accent} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      {perk}
                    </div>
                  ))}
                </div>
              </div>

              <PerfRow bg={tier.bg} />


              {/* Select */}
              <div style={{ padding: "10px 14px 14px", background: tier.bg, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ width: 20, height: 16, borderRadius: "50%", border: `1.5px solid ${isSelected ? tier.accent : "rgba(255,255,255,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {isSelected && <div style={{ width: 7, height: 7, borderRadius: "50%", background: tier.accent }} />}
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "5px 12px", borderRadius: 20, background: tier.btnBg, color: isSelected ? tier.accent : tier.btnColor }}>
                  {isSelected ? "Selected ✓" : "Select"}
                </span>
              </div>

            </div>
          </div>
        )
      })}
    </div>
  )
}