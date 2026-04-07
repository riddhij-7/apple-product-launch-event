"use client";
import { useState } from "react";

const labelStyle: React.CSSProperties = {
  fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
  color: "rgba(255,255,255,0.28)", marginBottom: 8,
};

export default function InviteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", handle: "", reach: "", niche: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/influencer-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{
        background: "#111", border: `1px solid white/22`,
        borderRadius: 22, padding: "56px 42px", textAlign: "center",
      }}>
        <div className="flex items-center justify-center">
        <div className="w-13 h-13 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-3 text-2xl">✓</div>
        </div>
        <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Application received</h3>
        <p style={{ color: "rgba(255,255,255,0.38)", lineHeight: 1.75, fontSize: 14 }}>
          Thank you for your interest for the Apple Event.<br />Keep creating.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: "#000", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 22, padding: "42px",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <div style={labelStyle}>Full Name</div>
          <input className="inf-input" type="text" placeholder="Your name"
            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <div style={labelStyle}>Email</div>
          <input className="inf-input" type="email" placeholder="you@example.com"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <div style={labelStyle}>Primary Handle</div>
          <input className="inf-input" type="text" placeholder="@yourhandle"
            value={form.handle} onChange={e => setForm({ ...form, handle: e.target.value })} />
        </div>
        <div>
          <div style={labelStyle}>Audience Size</div>
          <select className="inf-select" value={form.reach}
            onChange={e => setForm({ ...form, reach: e.target.value })}>
            <option value="">Select range</option>
            <option>10K – 50K</option>
            <option>50K – 200K</option>
            <option>200K – 1M</option>
            <option>1M+</option>
          </select>
        </div>
        <div style={{ gridColumn: "span 2" }}>
          <div style={labelStyle}>Content Niche</div>
          <select className="inf-select" value={form.niche}
            onChange={e => setForm({ ...form, niche: e.target.value })}>
            <option value="">Select your niche</option>
            <option>Tech</option>
            <option>Lifestyle</option>
            <option>Photography / Videography</option>
            <option>Gaming</option>
            <option>Fashion / Design</option>
          </select>
        </div>
      </div>

      {error && (
        <p style={{ color: "#f87171", fontSize: 13, marginTop: 12 }}>{error}</p>
      )}

      <div style={{ marginTop: 26 }}>
        <button
  className="btn-w"
  style={{ 
    backgroundColor: "rgb(37,99,235)", 
    opacity: loading ? 0.6 : 1,
    cursor: (!form.name || !form.email || !form.handle || loading) ? 'not-allowed' : 'pointer'
  }}
  disabled={!form.name || !form.email || !form.handle || loading}
  onClick={handleSubmit}
>
  {loading ? "Submitting…" : "Submit →"}
</button>
      </div>
    </div>
  );
}