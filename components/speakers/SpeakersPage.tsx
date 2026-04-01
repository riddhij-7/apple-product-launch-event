"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { previousEvents } from "../../data/event";

const speakers = [
  {
    name: "Craig Federighi",
    role: "SVP Software",
    image: "/images/craigfederighi.jpg",
  },
  {
    name: "Jony Ive",
    role: "Former Chief Designer",
    image: "/images/jonyive.webp",
  },
  {
    name: "John Ternus",
    role: "SVP Hardware",
    image: "/images/john.jpg",
  },
  {
    name: "Greg Joswiak",
    role: "SVP Worldwide Marketing",
    image: "/images/greg.webp",
  }
];


function EventCard({ ev }: { ev: typeof previousEvents[0]; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex-shrink-0 w-[300px] md:w-[380px] border border-white/10 rounded-2xl overflow-hidden group hover:border-white/25 transition-all duration-300">
      {/* Event Image */}
      <div className={`relative w-full h-[240px]  bg-ffffff}`}>
        {!imgError && (
          <Image
            src={ev.image}
            alt={ev.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105 opacity-100"
            onError={() => setImgError(true)}
          />
        )}
        {imgError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/20 text-4xl font-bold tracking-widest uppercase">
              {ev.title.split(" ").map(w => w[0]).join("")}
            </span>
          </div>
        )}
        
      </div>

      {/* Event Info */}
      <div className="p-6">
        <h3 className="text-white font-semibold text-lg group-hover:text-blue-300 transition-colors duration-200">
          {ev.title}
        </h3>
        <p className="text-gray-500 text-sm mt-1 mb-3">{ev.date}</p>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-5">
          {ev.description}
        </p>

        {/* Watch Links */}
        <div className="flex flex-col gap-2">
          
            <a href={ev.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 text-sm hover:text-blue-300 transition-colors duration-200 group/link">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-blue-400 group-hover/link:border-blue-300">
              <svg className="w-2.5 h-2.5 ml-0.5" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5 3.5v9l7-4.5z"/>
              </svg>
            </span>
            Watch
          </a>
          
            <a href={ev.watchAslUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 text-sm hover:text-blue-300 transition-colors duration-200 group/link"
           >
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-blue-400 group-hover/link:border-blue-300">
              <svg className="w-2.5 h-2.5 ml-0.5" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5 3.5v9l7-4.5z"/>
              </svg>
            </span>
            Watch in ASL
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SpeakersPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -420 : 420, behavior: "smooth" });
    setTimeout(updateScrollState, 400);
  };

  return (
    <main className="bg-black text-white">

      {/* ── Hero ── */}
      <section className="relative h-[90vh] flex items-end px-6 md:px-16 pb-16">
        <Image
          src="/images/timcookstage.jpg"
          alt="Tim Cook"
          fill
          className="object-cover opacity-120"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="relative z-10 max-w-2xl">
          <p className="text-blue-400 text-sm mb-2">Opening Keynote</p>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">Tim Cook</h1>
          <p className="text-gray-300 mt-3">CEO, Apple</p>
          <p className="mt-6 text-gray-400 max-w-lg">
            Join Tim Cook as he unveils the future of MacBook Neo and Apple's next generation of innovation.
          </p>
          <div className="mt-8 group cursor-pointer inline-flex items-center gap-2 text-white text-lg">
            <a href="https://www.youtube.com/watch?v=D80RTRjP1tQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 text-sm hover:text-blue-300 transition-colors duration-200 group/link"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-blue-400 group-hover/link:border-blue-300">
                <svg className="w-2.5 h-2.5 ml-0.5" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5 3.5v9l7-4.5z"/>
                </svg>
              </span>
              Watch Keynote
            </a>
          </div>
        </div>
      </section>

      {/* ── Featured Speakers Grid ── */}
      <section className="px-6 md:px-16 py-20">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">Featured Speakers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {speakers.map((s, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden group cursor-pointer">
              <div className="relative w-full h-[300px]">
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-sm font-semibold">{s.name}</h3>
                <p className="text-xs text-gray-400">{s.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Scrolling Quotes ── */}
      <section className="bg-black text-white px-6 md:px-16 py-28 border-t border-white/10 overflow-hidden">
        <div className="max-w-xl mb-16">
          <h2 className="text-1xl md:text-3xl font-semibold mb-4">
            What They Say About MacBook Neo
          </h2>
          <p className="text-gray-400 mt-4">Hear directly from the minds behind the innovation.</p>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-6 animate-scroll whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-6">
                {[
                  { quote: "We wanted to create something that feels inevitable, simple, powerful, and beautifully intuitive.", name: "Jony Ive", role: "Former Chief Designer" },
                  { quote: "MacBook Neo redefines performance. It's the most seamless integration of hardware and software.", name: "Craig Federighi", role: "SVP Software" },
                  { quote: "Every detail is engineered for precision, performance, and longevity.", name: "John Ternus", role: "SVP Hardware" },
                  { quote: "MacBook Neo is a testament to our commitment to innovation and design excellence.", name: "Steve Jobs", role: "Co-Founder" },
                ].map((q, j) => (
                  <div key={j} className="min-w-[280px] max-w-[340px] bg-black border border-white/20 rounded-3xl p-6">
                    <p className="text-lg leading-relaxed whitespace-normal">"{q.quote}"</p>
                    <div className="mt-6 text-gray-400 text-sm text-right">
                      <p className="text-white">{q.name}</p>
                      <p>{q.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── View Recent Apple Events ── */}
      <section className="bg-black text-white px-6 md:px-16 py-24 border-t border-white/10">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-1xl md:text-3xl font-semibold">View recent Apple events</h2>
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-xl
                         transition-all duration-200 hover:bg-white/20
                         disabled:opacity-25 disabled:cursor-not-allowed"
            >‹</button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-xl
                         transition-all duration-200 hover:bg-white/20
                         disabled:opacity-25 disabled:cursor-not-allowed"
            >›</button>
          </div>
        </div>
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {previousEvents.map((ev, index) => (
            <EventCard key={ev.slug} ev={ev} index={index} />
          ))}
        </div>
      </section>

    </main>
  );
}