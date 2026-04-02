"use client";
import { useEffect } from "react";
import InviteForm from "./Inviteforms";

const NEO = {
  pink: "#f4a7b9",
  yellow: "#f5e642",
  blue: "#7aa7d2",
  gray: "#c8c8c8",
  white: "#ffffff",
  bg: "#000000",
  card: "#111111",
};

const PERKS = [
  {
    color: "#f5e642",
    title: "First Touch",
    desc: "Handle the MacBook Neo before the world sees it. Your content, your terms, embargoed until launch.",
  },
  {
    color: "#f4a7b9",
    title: "Creator Kit",
    desc: "Exclusive Neo merch, accessories, and a limited-run creator bundle packed in an Apple branded box.",
  },
  {
    color: "#7aa7d2",
    title: "Studio Access",
    desc: "Pro lighting, clean backdrops, and a dedicated content bay built for the shot you have in mind.",
  },
  {
    color: "#c8c8c8",
    title: "1:1 Briefings",
    desc: "Time with Apple engineers and product leads. Real specs, real answers, go as deep as you want.",
  },
  {
    color: "#f5e642",
    title: "VIP Lounge",
    desc: "A private space with your peers. Fellow creators, editors, Apple's creative team. Network, collaborate.",
  },
];

const CREATORS = [
  {
    handle: "@ishansharma7390",
    name: "Ishan Sharma",
    niche: "Tech",
    followers: "18.2M",
    accent: "#f5e642",
  },
  {
    handle: "@saigodbole",
    name: "Sai Godbole",
    niche: "Lifestyle",
    followers: "22.1M",
    accent: "#f4a7b9",
  },
  {
    handle: "@kenavita",
    name: "Kenavita",
    niche: "Lifestyle",
    followers: "15.7M",
    accent: "#7aa7d2",
  },
  {
    handle: "@beerbiceps",
    name: "Ranveer Allahbadia",
    niche: "Personal growth",
    followers: "5.4M",
    accent: "#c8c8c8",
  },
  {
    handle: "@tanmaybhat",
    name: "Tanmay Bhat",
    niche: "Entertainment",
    followers: "2.1M",
    accent: "#f5e642",
  },
  {
    handle: "@mkb",
    name: "Marques Brownlee",
    niche: "Tech",
    followers: "3.6M",
    accent: "#f4a7b9",
  },
];

const GALLERY = [
  {
    label: "WWDC 2024",
    span: 1,
    accent: "#f5e642",
    src: "/images/WWDC2.jpg",
  },
  {
    label: "iPhone 16 Launch",
    span: 1,
    accent: "#f4a7b9",
    src: "/images/event1.jpg",
  },
  {
    label: "Creator Summit",
    span: 1,
    accent: "#7aa7d2",
    src: "/images/creator.jpg",
  },
  {
    label: "Watch Series 9",
    span: 1,
    accent: "#c8c8c8",
    src: "/images/WWDC.jpg",
  },
  {
    label: "Apple Park Tour",
    span: 1,
    accent: "#f4a7b9",
    src: "/images/store.jpg",
  },
  {
    label: "MacBook Air Launch",
    span: 1,
    accent: "#7aa7d2",
    src: "/images/ios26.jpg",
  },
  {
    label: "Developers outside of Caffè Macs cheer as Apple Vision Pro is unveiled",
    span: 2,
    accent: "#f5e642",
    src: "/images/influencers1.jpg",
  },
  {
    label: "Press attendees take a look at Apple Vision Pro",
    span: 1,
    accent: "#c8c8c8",
    src: "/images/influencers2.jpg",
  },
  {
    label: "The winners of the Apple Design Awards share a moment onstage at the ceremony.",
    span: 1,
    accent: "#7aa7d2",
    src: "/images/influencers3.jpg",
  },
  {
    label: "Craig Federighi poses for a selfie with influencers.",
    span: 1,
    accent: "#f4a7b9",
    src: "/images/influencers4.jpg",
  },
  {
    label: "An attendee poses at the launch of WWDC24.",
    span: 1,
    accent: "#c8c8c8",
    src: "/images/influencers5.jpg",
  },
];

const colors = [NEO.yellow, NEO.pink, NEO.blue, NEO.gray];

function ScrollObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return null;
}

export default function Influencers() {
  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
        overflowX: "hidden",
      }}
    >
      <ScrollObserver />

      {/* HERO */}
      <div className="hero-grid">
        {/* Copy */}
        <div>
          <h1
            className="fu2"
            style={{
              marginTop: 26,
              fontSize: "clamp(50px,6vw,78px)",
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
            }}
          >
            Make
            <br />
            <span className="neo-smooth">Something</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.2)" }}>
              unforgettable.
            </span>
          </h1>

          <p
            className="fu3"
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: "rgba(255, 255, 255, 0.51)",
              maxWidth: 440,
              marginTop: 18,
            }}
          >
            Apple invites the world's top creators to get their hands on the latest Apple products, and tell that story to their audiences in their
            own voice.
          </p>

          <div
            className="fu4"
            style={{
              display: "flex",
              gap: 10,
              marginTop: 34,
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn-w"
              onClick={() =>
                document
                  .getElementById("apply")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Request an invite →
            </button>
            <button
              className="btn-g"
              onClick={() =>
                document
                  .getElementById("perks")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See what's included
            </button>
          </div>

          <div
            className="fu4"
            style={{ display: "flex", gap: 40, marginTop: 54 }}
          >
            {[
              ["100+", "creators hosted"],
              ["3-5", "events / year"],
              ["#1", "creator program"],
            ].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 27, fontWeight: 600 }}>{n}</div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.28)",
                    marginTop: 4,
                    letterSpacing: "0.04em",
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image frame */}
        <div className="hero-frame fu2">
          <div className="hero-img-ph" style={{ padding: 0 }}>
            <img
              src="/images/girl.jpg"
              alt="creator"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 30%",
              }}
            />
          </div>
          <div className="hero-overlay">
            <div
              style={{
                fontSize: 9,
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.32)",
                marginBottom: 5,
              }}
            >
              FEATURED
            </div>
            <div style={{ fontSize: 17, fontWeight: 600 }}>WWDC</div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.36)",
                marginTop: 4,
              }}
            >
              Apple Park, Cupertino · 2025
            </div>
          </div>
        </div>
      </div>

      {/* TICKER */}
      <div
        style={{
          overflow: "hidden",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "13px 0",
          marginBottom: 0,
          marginTop: 80,
        }}
      >
        <div className="ticker-inner">
          {[...Array(3)].map((_, i) => (
            <span key={i}>
              {[
                "FIRST ACCESS",
                "CREATOR KIT",
                "STUDIO SETUP",
                "APPLE ENGINEERS",
                "VIP LOUNGE",
                "PRESS ASSETS",
                "MACBOOK NEO",
              ].map((t, j) => (
                <span
                  key={j}
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    color: colors[j % colors.length],
                    marginRight: 40,
                    whiteSpace: "nowrap",
                  }}
                >
                  {t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* PERKS */}
      <section
        id="perks"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 48px" }}
      >
        <div
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 50,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "clamp(34px,4vw,52px)",
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Your invite,
              <br />
              <span style={{ color: "rgba(255,255,255,0.2)" }}>
                your perks.
              </span>
            </h2>
          </div>
        </div>
        <div
          className="reveal perks-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 13,
          }}
        >
          {PERKS.map((p, i) => (
            <div className="perk-card" key={p.title}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.16)",
                    letterSpacing: "0.08em",
                  }}
                >
                  0{i + 1}
                </span>
              </div>
              <div
                style={{
                  width: 22,
                  height: 2,
                  borderRadius: 2,
                  background: p.color,
                  marginBottom: 15,
                  opacity: 0.65,
                }}
              />
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  marginBottom: 10,
                  letterSpacing: "-0.01em",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.7,
                  color: "rgba(255, 255, 255, 0.51)",
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-rule" />

      {/* PAST CREATORS */}
      <section
        style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 48px" }}
      >
        <div className="reveal" style={{ marginBottom: 46 }}>
          <h2
            style={{
              fontSize: "clamp(30px,4vw,48px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            Global Creators who've
            <br />
            <span style={{ color: "rgba(255, 255, 255, 0.51)" }}>
              been there.
            </span>
          </h2>
        </div>
        <div
          className="reveal creators-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 10,
          }}
        >
          {CREATORS.map((c) => (
            <div className="creator-row" key={c.handle}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  background: "#000000",
                  border: `1px solid ${c.accent}33`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 500,
                  flexShrink: 0,
                }}
              >
                {c.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{c.name}</div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255, 255, 255, 0.51)",
                    marginTop: 2,
                  }}
                >
                  {c.handle}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.62)" }}
                >
                  {c.followers}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    marginTop: 3,
                    letterSpacing: "0.06em",
                    opacity: 0.72,
                  }}
                >
                  {c.niche}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section
        id="gallery"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px 100px" }}
      >
        <div
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 34,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "clamp(30px,4vw,48px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Inside the
              <br />
              <span style={{ color: "rgba(255,255,255,0.2)" }}>events.</span>
            </h2>
          </div>
        </div>
        <div
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gridTemplateRows: "220px 220px",
            gap: 10,
          }}
        >
          {GALLERY.map((g, i) => (
            <div
              key={g.label}
              className="gallery-cell"
              style={{ gridColumn: `span ${g.span}` }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: g.accent,
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.07)",
                  letterSpacing: "0.1em",
                }}
              >
                <img
                  src={g.src}
                  alt={g.label}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="g-overlay">
                <div>
                  <div
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      color: g.accent,
                      marginBottom: 4,
                      opacity: 0.8,
                    }}
                  >
                    EVENT
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>
                    {g.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-rule" />

      {/* APPLY FORM */}
      <section
        id="apply"
        style={{ maxWidth: 680, margin: "0 auto", padding: "100px 48px" }}
      >
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <h2
            style={{
              fontSize: "clamp(34px,4vw,54px)",
              fontStyle: "small",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Request your
            <br />
            <span className="neo-smooth">Invite</span>
          </h2>
          <p
            style={{
              marginTop: 14,
              fontSize: 14,
              lineHeight: 1.8,
              color: "rgba(255, 255, 255, 0.51)",
            }}
          >
            Authentic audiences and original content are what we look for.
          </p>
        </div>

        <InviteForm />
      </section>

      {/* RSVP CTA */}
      <section
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px 100px" }}
      >
        <div className="rsvp-strip reveal">
          <div>
            <h2
              style={{
                fontSize: "clamp(26px,3.5vw,42px)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Secure your spot
              <br />
              <span style={{ color: "rgba(255,255,255,0.22)" }}>
                at the MacBook Neo launch.
              </span>
            </h2>
            <p
              style={{
                marginTop: 12,
                fontSize: 13.5,
                color: "rgba(255, 255, 255, 0.51)",
              }}
            >
              General · Press · Influencer · VIP passes available.
            </p>
          </div>
          <div
            className="rsvp-strip-cta"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 10,
            }}
          >
            <a href="/rsvp" style={{ textDecoration: "none" }}>
              <button
                className="btn-w"
                style={{
                  fontSize: 15,
                  padding: "15px 40px",
                  backgroundColor: "rgb(37, 99, 235)",
                }}
              >
                RSVP Now →
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}