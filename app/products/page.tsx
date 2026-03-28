"use client"
import { scale } from 'framer-motion';
// ✅ Must have 'export default' on the main component
import Image from 'next/image';
import { transform } from 'zod';
export default function ProductsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-black absolute top-0 left-0">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
        <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-100"
            style={{
            objectFit: 'cover',
            objectPosition: 'center center',
            transform: 'scale(0.75)',       
            transformOrigin: 'center center',    

            }}
        >
            <source src="/videos/pro.mp4" type="video/mp4" />
            <source src="/videos/pro.webm" type="video/webm" />
        </video>
        </div>
        

        {/* Text Content */}
        <div className="relative z-10">
          <h1 className="text-6xl font-bold text-white">
            Highlighted <span className="text-300">Products</span>
          </h1>
          <p className="mt-4 text-xl text-white/80">
            Explore the updated Apple lineup.
          </p>
        </div>

        {/* Scroll indicator */}
        <p className="absolute bottom-10 text-white/50 tracking-widest text-sm">
          SCROLL
        </p>

      </section>
      {/* Products Section */}
<section className="bg-[#f5f5f7] py-20 px-6">
  
  {/* Section Title */}
  <h2 className="text-4xl md:text-5xl font-bold text-black text-center mb-12">
    Here's what we announced.
  </h2>

  {/* Cards Container */}
  <div className="max-w-4xl mx-auto flex flex-col gap-6">
    {/* iPhone 17 Pro Card */}
<div className="relative rounded-3xl overflow-hidden min-h-[320px] flex flex-row"
  style={{ background: 'linear-gradient(135deg, #1a0f00, #2d1a00, #1a0f00)' }}>

  {/* Image Left */}
  <div className="w-[42%] relative flex items-center justify-center overflow-hidden"
    style={{ background: 'radial-gradient(ellipse at center, #7c3a00 0%, #0f0800 70%)' }}>
    
    {/* Glow effect */}
    <div className="absolute inset-0 rounded-full scale-125"
      style={{ background: 'radial-gradient(circle at 50% 50%, rgba(249,115,22,0.3), transparent 65%)' }} />
    
    {/* Your product image */}
    <Image
      src="/images/Iphone 17 pro.jpg" 
      alt="iPhone 17 Pro"
      fill
      className="object-cover object-center opacity-90"
    />
  </div>

  {/* Text Right */}
  <div className="w-[58%] flex flex-col justify-center px-8 py-10">

    {/* Tag */}
    <span className="text-[11px] font-medium tracking-wide px-3 py-1 rounded-full w-fit mb-4"
      style={{ background: 'rgba(249,115,22,0.2)', color: '#fdba74' }}>
      Pro — Titanium
    </span>

    {/* Title */}
    <h3 className="text-[26px] font-medium text-white mb-3">
      iPhone 17 Pro
    </h3>

    {/* Spec pills */}
    <div className="flex flex-wrap gap-2 mb-4">
      {['A19 Pro', '48MP Camera', 'Ceramic Shield 2'].map((spec) => (
        <span key={spec} className="text-[11px] px-3 py-1 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
          {spec}
        </span>
      ))}
    </div>


    {/* Description */}
    <p className="text-[13px] leading-relaxed mb-5"
      style={{ color: 'rgba(255,255,255,0.6)' }}>
      The most powerful iPhone ever. Breakthrough battery life. Our best display ever with Ceramic Shield 2 on the front, the powerful A19 Pro chip, all 48MP rear cameras and the new Center Stage front camera.
    </p>

    {/* Learn more */}
    <a href="/iphone-17-pro"
      className="text-[13px] font-medium transition-colors hover:opacity-80"
      style={{ color: '#fb923c' }}>
      Learn more ›
    </a>

  </div>
</div>


{/* iPhone 17 Purple Card */}
<div className="relative rounded-3xl overflow-hidden min-h-[320px] flex flex-row"
  style={{ background: 'linear-gradient(135deg, #0d0618, #1a0a2e, #0d0618)' }}>

  {/* Image Left */}
  <div className="w-[42%] relative flex items-center justify-center overflow-hidden"
    style={{ background: 'radial-gradient(ellipse at center, #4a1d7a 0%, #0a0412 70%)' }}>

    {/* Glow effect */}
    <div className="absolute inset-0 rounded-full scale-125"
      style={{ background: 'radial-gradient(circle at 50% 50%, rgba(167,139,250,0.3), transparent 65%)' }} />

    {/* Product image */}
    <Image
      src="/images/iPhone-17.webp"
      alt="iPhone 17 Purple"
      fill
      className="object-cover object-top opacity-90"
      
    />
  </div>

  {/* Text Right */}
  <div className="w-[58%] flex flex-col justify-center px-8 py-10">

    {/* Tag */}
    <span className="text-[11px] font-medium tracking-wide px-3 py-1 rounded-full w-fit mb-4"
      style={{ background: 'rgba(167,139,250,0.2)', color: '#c4b5fd' }}>
        Lavender Purple
    </span>

    {/* Title */}
    <h3 className="text-[26px] font-medium text-white mb-3">
      iPhone 17
    </h3>

    {/* Spec pills */}
    <div className="flex flex-wrap gap-2 mb-4">
      {['A19 Chip', '48MP Camera', 'Ceramic Shield 2'].map((spec) => (
        <span key={spec} className="text-[11px] px-3 py-1 rounded-lg"
          style={{ background: 'rgba(167,139,250,0.1)', color: 'rgba(255,255,255,0.5)' }}>
          {spec}
        </span>
      ))}
    </div>

    {/* Description */}
    <p className="text-[13px] leading-relaxed mb-5"
      style={{ color: 'rgba(255,255,255,0.6)' }}>
      Even more delightful. Even more durable. Our best display ever with ProMotion up to 120Hz and the new Ceramic Shield 2 on the front. An advanced 48MP Dual Fusion camera system. And the new Center Stage front camera.
    </p>

    {/* Learn more */}
    <a href="/iphone-16"
      className="text-[13px] font-medium transition-colors hover:opacity-80"
      style={{ color: '#a78bfa' }}>
      Learn more ›
    </a>

  </div>
</div>

    {/* iPhone 17 air - Dark */}
    {/* iPhone 17 Air Card */}
<div className="relative rounded-3xl overflow-hidden min-h-[320px] flex flex-row"
  style={{ background: 'linear-gradient(135deg, #080808, #111111, #080808)' }}>

  {/* Image Left */}
  <div className="w-[42%] relative flex items-center justify-center overflow-hidden"
    style={{ background: 'radial-gradient(ellipse at center, #2a2a2a 0%, #050505 70%)' }}>

    {/* Glow effect */}
    <div className="absolute inset-0 rounded-full scale-125"
      style={{ background: 'radial-gradient(circle at 50% 50%, rgba(180,180,180,0.15), transparent 65%)' }} />

    {/* Product image */}
    <Image
      src="/images/iphone-air.jpg" 
      alt="iPhone 17 Air"
      fill
      className="object-cover object-top opacity-90"
    />
  </div>

  {/* Text Right */}
  <div className="w-[58%] flex flex-col justify-center px-8 py-10">

    {/* Tag */}
    <span className="text-[11px] font-medium tracking-wide px-3 py-1 rounded-full w-fit mb-4"
      style={{ background: 'rgba(255,255,255,0.08)', color: '#d1d5db' }}>
      New — Black Titanium
    </span>

    {/* Title */}
    <h3 className="text-[26px] font-medium text-white mb-3">
      iPhone 17 Air
    </h3>

    {/* Spec pills */}
    <div className="flex flex-wrap gap-2 mb-4">
      {['A18 Chip', 'Ultra Slim', 'Single Camera'].map((spec) => (
        <span key={spec} className="text-[11px] px-3 py-1 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)' }}>
          {spec}
        </span>
      ))}
    </div>

    {/* Description */}
    <p className="text-[13px] leading-relaxed mb-5"
      style={{ color: 'rgba(255,255,255,0.55)' }}>
      The thinnest iPhone ever with the power of pro inside. More durable than any previous iPhone. Our best display ever with Ceramic Shield 2 on the front. The powerful A19 Pro chip. An advanced 48MP Fusion camera system. And the new Center Stage front camera.
    </p>

    {/* Learn more */}
    <a href="/iphone-17-air"
      className="text-[13px] font-medium transition-colors hover:opacity-80"
      style={{ color: '#9ca3af' }}>
      Learn more ›
    </a>

  </div>
</div>


      {/* AirPods Pro 3 Card */}
<div className="relative rounded-3xl overflow-hidden min-h-[320px] flex flex-row"
  style={{ background: 'linear-gradient(135deg, #1a1a1f, #2a2a32, #1a1a1f)' }}>

  {/* Image Left */}
  <div className="w-[42%] relative flex items-center justify-center overflow-hidden"
    style={{ background: 'radial-gradient(ellipse at center, #3a3a45 0%, #0d0d12 70%)' }}>

    {/* Glow effect */}
    <div className="absolute inset-0 rounded-full scale-125"
      style={{ background: 'radial-gradient(circle at 50% 50%, rgba(192,192,210,0.2), transparent 65%)' }} />

    {/* Product image */}
    <Image
      src="/images/airpods-pro.jpg"
      alt="AirPods Pro 3"
      fill
      className="object-cover object-center opacity-95"
    />
  </div>

  {/* Text Right */}
  <div className="w-[58%] flex flex-col justify-center px-8 py-10">

    {/* Tag */}
    <span className="text-[11px] font-medium tracking-wide px-3 py-1 rounded-full w-fit mb-4"
      style={{ background: 'rgba(222, 222, 246, 0.15)', color: '#c5c5d6' }}>
      Pro 3 — Silver Metallic
    </span>

    {/* Title */}
    <h3 className="text-[26px] font-medium text-white mb-3">
      AirPods Pro 3
    </h3>

    {/* Spec pills */}
    <div className="flex flex-wrap gap-2 mb-4">
      {['H3 Chip', 'ANC 2.0', '30hr Battery'].map((spec) => (
        <span key={spec} className="text-[11px] px-3 py-1 rounded-lg"
          style={{
            background: 'rgba(192,192,210,0.08)',
            color: 'rgba(192,192,210,0.5)',
            border: '0.5px solid rgba(192,192,210,0.12)',
          }}>
          {spec}
        </span>
      ))}
    </div>

    {/* Description */}
    <p className="text-[13px] leading-relaxed mb-5"
      style={{ color: 'rgba(255,255,255,0.55)' }}>
      Featuring the world’s best in-ear Active Noise Cancellation. Exceptional sound quality. All-new heart rate sensing during workouts. Live Translation to communicate across languages. And improved battery life with up to 8 hours of listening time.
    </p>

    {/* Learn more */}
    <a href="/airpods-pro-3"
      className="text-[13px] font-medium transition-colors hover:opacity-80"
      style={{ color: '#a8a8c0' }}>
      Learn more ›
    </a>

  </div>
</div>
{/* Apple Watch Series 11 Card */}
<div className="relative rounded-3xl overflow-hidden min-h-[320px] flex flex-row"
  style={{ background: 'linear-gradient(135deg, #1f0d0d, #2d1520, #1f0d0d)' }}>

  {/* Image Left */}
  <div className="w-[42%] relative flex items-center justify-center overflow-hidden"
    style={{ background: 'radial-gradient(ellipse at center, #5a2040 0%, #0f0508 70%)' }}>

    {/* Glow effect */}
    <div className="absolute inset-0 rounded-full scale-125"
      style={{ background: 'radial-gradient(circle at 50% 50%, rgba(216,150,180,0.25), transparent 65%)' }} />

    {/* Product image */}
    <Image
      src="/images/apple-watch-series11.jpg"
      alt="Apple Watch Series 11"
      fill
      className="object-cover object-top object-right opacity-95"
      style={{
        objectFit: 'cover',
            objectPosition: 'center center',
            transform: 'scale(1.2)',       
            transformOrigin: 'center center', 
      }}
    />
  </div>

  {/* Text Right */}
  <div className="w-[58%] flex flex-col justify-center px-8 py-10">

    {/* Tag */}
    <span className="text-[11px] font-medium tracking-wide px-3 py-1 rounded-full w-fit mb-4"
      style={{ background: 'rgba(216,150,180,0.2)', color: '#f4b8d0' }}>
      Series 11
    </span>

    {/* Title */}
    <h3 className="text-[26px] font-medium text-white mb-3">
      Apple Watch Series 11
    </h3>

    {/* Spec pills */}
    <div className="flex flex-wrap gap-2 mb-4">
      {['S11 Chip', 'Blood Glucose', 'Always-On'].map((spec) => (
        <span key={spec} className="text-[11px] px-3 py-1 rounded-lg"
          style={{
            background: 'rgba(216,150,180,0.1)',
            color: 'rgba(255,255,255,0.5)',
            border: '0.5px solid rgba(216,150,180,0.15)',
          }}>
          {spec}
        </span>
      ))}
    </div>

    {/* Description */}
    <p className="text-[13px] leading-relaxed mb-5"
      style={{ color: 'rgba(255,255,255,0.6)' }}>
      The ultimate watch for a healthy life. Wake up to your sleep score. Boost your fitness with new Workout Buddy. And enjoy up to 24 hours of battery life.
    </p>

    {/* Learn more */}
    <a href="/images/apple-watch-series11"
      className="text-[13px] font-medium transition-colors hover:opacity-80"
      style={{ color: '#f4a0c0' }}>
      Learn more ›
    </a>

  </div>
</div>

 {/* Apple Watch SE 3 Card */}
<div className="relative rounded-3xl overflow-hidden min-h-[320px] flex flex-row"
  style={{ background: 'linear-gradient(135deg, #1a1610, #251e14, #1a1610)' }}>

  {/* Image Left */}
  <div className="w-[42%] relative flex items-center justify-center overflow-hidden"
    style={{ background: 'radial-gradient(ellipse at center, #3d3020 0%, #0d0a06 70%)' }}>

    {/* Glow effect */}
    <div className="absolute inset-0 rounded-full scale-125"
      style={{ background: 'radial-gradient(circle at 50% 50%, rgba(245,220,180,0.2), transparent 65%)' }} />

    {/* Product image */}
    <Image
      src="/images/apple-watch-se-3.jpg" 
      alt="Apple Watch SE 3"
      fill
      className="object-cover object-center opacity-95"
    />
  </div>

  {/* Text Right */}
  <div className="w-[58%] flex flex-col justify-center px-8 py-10">

    {/* Tag */}
    <span className="text-[11px] font-medium tracking-wide px-3 py-1 rounded-full w-fit mb-4"
      style={{ background: 'rgba(245,220,180,0.15)', color: '#e8d5a8' }}>
      SE 3 — Starlight
    </span>

    {/* Title */}
    <h3 className="text-[26px] font-medium text-white mb-3">
      Apple Watch SE 3
    </h3>

    {/* Spec pills */}
    <div className="flex flex-wrap gap-2 mb-4">
      {['S9 Chip', 'GPS + Cellular', '40mm / 44mm'].map((spec) => (
        <span key={spec} className="text-[11px] px-3 py-1 rounded-lg"
          style={{
            background: 'rgba(245,220,180,0.08)',
            color: 'rgba(255,255,255,0.5)',
            border: '0.5px solid rgba(245,220,180,0.12)',
          }}>
          {spec}
        </span>
      ))}
    </div>

    {/* Description */}
    <p className="text-[13px] leading-relaxed mb-5"
      style={{ color: 'rgba(255,255,255,0.6)' }}>
      The essential Apple Watch experience. Powerful health 
      and safety features, GPS and Cellular connectivity, 
      all in a lightweight starlight aluminium case.
    </p>

    {/* Learn more */}
    <a href="/apple-watch-se-3"
      className="text-[13px] font-medium transition-colors hover:opacity-80"
      style={{ color: '#e8d5a8' }}>
      Learn more ›
    </a>

  </div>
</div>

{/* Apple Watch Ultra 3 Card */}
<div className="relative rounded-3xl overflow-hidden min-h-[320px] flex flex-row"
  style={{ background: 'linear-gradient(135deg, #020a02, #041404, #020a02)' }}>

  {/* Image Left */}
  <div className="w-[42%] relative flex items-center justify-center overflow-hidden"
    style={{ background: 'radial-gradient(ellipse at center, #0a2a0a 0%, #010401 70%)' }}>

    {/* Glow effect */}
    <div className="absolute inset-0 rounded-full scale-125"
      style={{ background: 'radial-gradient(circle at 50% 80%, rgba(100,220,100,0.35), transparent 60%)' }} />

    {/* Product image */}
    <Image
      src="/images/apple-watch-ultra.jpg" 
      alt="Apple Watch Ultra 3"
      fill
      className="object-cover object-center opacity-95"
    />
  </div>

  {/* Text Right */}
  <div className="w-[58%] flex flex-col justify-center px-8 py-10">

    {/* Tag */}
    <span className="text-[11px] font-medium tracking-wide px-3 py-1 rounded-full w-fit mb-4"
      style={{ background: 'rgba(100,220,100,0.15)', color: '#86efac' }}>
      Ultra 3 — Titanium
    </span>

    {/* Title */}
    <h3 className="text-[26px] font-medium text-white mb-3">
      Apple Watch Ultra 3
    </h3>

    {/* Spec pills */}
    <div className="flex flex-wrap gap-2 mb-4">
      {['S10 Chip', '72hr Battery', 'Dual GPS'].map((spec) => (
        <span key={spec} className="text-[11px] px-3 py-1 rounded-lg"
          style={{
            background: 'rgba(100,220,100,0.08)',
            color: 'rgba(255,255,255,0.5)',
            border: '0.5px solid rgba(100,220,100,0.15)',
          }}>
          {spec}
        </span>
      ))}
    </div>

    {/* Description */}
    <p className="text-[13px] leading-relaxed mb-5"
      style={{ color: 'rgba(255,255,255,0.6)' }}>
      Multi-day battery life,9 the largest, brightest display on an Apple Watch, advanced metrics, 5G10 and dual-frequency GPS — it’s the ultimate sports and adventure watch.
    </p>

    {/* Learn more */}
    <a href="/apple-watch-ultra-3"
      className="text-[13px] font-medium transition-colors hover:opacity-80"
      style={{ color: '#4ade80' }}>
      Learn more ›
    </a>

  </div>
</div>
    {/* Add more cards following the same pattern */}
    



  </div>
</section>

      {/* Rest of your products content below */}
    </>
  )
}