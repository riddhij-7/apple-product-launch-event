"use client";
{/*
import Image from "next/image";

const speakers = [
  {
    name: "Craig Federighi",
    role: "SVP Software",
    image: "/images/craigfederighi.jpg",
    bio: `Craig Federighi is a prominent figure in the tech industry, currently serving as Apple’s Senior Vice President of Software Engineering. Known for his charismatic stage presence during Apple’s annual events, Federighi oversees the development of iOS, macOS, and other Apple software. His influence is evident in the seamless integration of Apple’s ecosystem, emphasizing user-friendly experiences and robust security features.`,
  },
  {
    name: "Tim Cook",
    role: "CEO, Apple",
    image: "/images/timcook.jpg",
    bio: `Tim Cook leads Apple with a focus on innovation, sustainability, and privacy. Under his leadership, Apple has expanded its ecosystem while maintaining its commitment to user experience and design excellence.`,
  },
  {
    name: "Jony Ive",
    role: "Former Chief Designer",
    image: "/images/jonyive.webp",
    bio: `Jony Ive, Apple’s former Chief Design Officer, is renowned for his minimalist and elegant design philosophy. He played a pivotal role in shaping the aesthetics of Apple’s products, including the iPhone, iPad, and MacBook. Ive’s work has earned him numerous awards and solidified his legacy as one of the most influential designers in the tech industry.`,
  },
  {
    name: "John Ternus",
    role: "SVP Hardware",
    image: "/images/john.jpg",
    bio: `John Ternus is Apple’s Senior Vice President of Hardware Engineering, responsible for overseeing the development of Apple’s hardware products. With a background in engineering and a passion for innovation, Ternus has been instrumental in the design and engineering of Apple’s latest devices, including the MacBook Neo. His leadership ensures that Apple continues to push the boundaries of technology while maintaining its commitment to quality and performance.`,
  },
  {
    name: "Steve Jobs",
    role: "Founder, Apple",
    image: "/images/stevejobs.jpg",
    bio: `Steve Jobs, the visionary co-founder of Apple, revolutionized the tech industry with his innovative products and charismatic leadership. His relentless pursuit of excellence and design perfection led to the creation of iconic devices like the iPhone, iPad, and MacBook. Jobs’ legacy continues to inspire innovation and creativity in technology.`,
  },

];

export default function SpeakersPage() {
  return (
    <main className="bg-black min-h-screen text-white px-6 py-20">

      <h1 className="text-5xl font-semibold text-center mb-6">
        Speakers
      </h1>
      <p className="text-gray-600 mt-4 max-w-2xl mx-auto mb-12">
          Hear from the innovators, designers, and engineers shaping the future of Apple.
          Get insights directly from the people behind the breakthrough.
        </p>


      <div className="space-y-12 max-w-5xl mx-auto">

        {speakers.map((s, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row items-center gap-8 bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-10 shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(255,255,255,0.08)] transition
            ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
          >
            <div className="w-full md:w-[260px] h-[300px] relative rounded-2xl overflow-hidden flex-shrink-0">
              <Image
                src={s.image}
                alt={s.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="text-left">
              <h2 className="text-2xl font-semibold">{s.name}</h2>
              <p className="text-gray-400 text-sm mb-4">{s.role}</p>

              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {s.bio}
              </p>
            </div>
          </div>
        ))}

      </div>
    </main>
  );
}
*/}

import Image from "next/image";

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
    name: "Steve Jobs",
    role: "Founder, Apple",
    image: "/images/stevejobs.jpg",
  },
];

export default function SpeakersPage() {
  return (
    <main className="bg-black text-white">
      <section className="relative h-[90vh] flex items-end px-6 md:px-16 pb-16">
        
        {/* Background Image */}
        <Image
          src="/images/timcookstage.jpg"
          alt="Tim Cook"
          fill
          className="object-cover opacity-120"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="relative z-10 max-w-2xl">
          <p className="text-blue-400 text-sm mb-2">Opening Keynote</p>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">
            Tim Cook
          </h1>
          <p className="text-gray-300 mt-3">CEO, Apple</p>

          <p className="mt-6 text-gray-400 max-w-lg">
            Join Tim Cook as he unveils the future of MacBook Neo and Apple’s next generation of innovation.
          </p>

          {/* CTA */}
          <div className="mt-8 group cursor-pointer inline-flex items-center gap-2 text-white text-lg">
            Watch Keynote
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">
          Featured Speakers
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {speakers.map((s, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="relative w-full h-[300px]">
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Overlay */}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-sm font-semibold">{s.name}</h3>
                <p className="text-xs text-gray-400">{s.role}</p>
              </div>
            </div>
          ))}

        </div>

      </section>
      <section className="bg-black text-white px-6 md:px-16 py-28 border-t border-white/10 overflow-hidden">

        <div className="max-w-xl mb-16">
          <h2 className="text-1xl md:text-3xl font-semibold mb-4">
            What They Say About MacBook Neo
          </h2>
          <p className="text-gray-400 mt-4">
            Hear directly from the minds behind the innovation.
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          
          <div className="flex gap-6 animate-scroll whitespace-nowrap">

            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-6">

                <div className="min-w-[280px] max-w-[340px] bg-black border border-white/20 rounded-3xl p-6">
                  <p className="text-lg leading-relaxed whitespace-normal" >
                    “We wanted to create something that feels inevitable, simple, powerful, and beautifully intuitive.”
                  </p>
                  <div className="mt-6 text-gray-400 text-sm text-right">
                    <p className="text-white">Jony Ive</p>
                    <p>Former Chief Designer</p>
                  </div>
                </div>

                <div className="min-w-[280px] max-w-[340px] bg-black border border-white/20 rounded-3xl p-6">
                  <p className="text-lg leading-relaxed whitespace-normal">
                    “MacBook Neo redefines performance. It’s the most seamless integration of hardware and software.”
                  </p>
                  <div className="mt-6 text-gray-400 text-sm text-right">
                    <p className="text-white">Craig Federighi</p>
                    <p>SVP Software</p>
                  </div>
                </div>

                <div className="min-w-[280px] max-w-[340px] bg-black border border-white/20 rounded-3xl p-6">
                  <p className="text-lg leading-relaxed whitespace-normal">
                    “Every detail is engineered for precision, performance, and longevity.”
                  </p>
                  <div className="mt-6 text-gray-400 text-sm text-right">
                    <p className="text-white">John Ternus</p>
                    <p>SVP Hardware</p>
                  </div>
                </div>

                <div className="min-w-[280px] max-w-[340px] bg-black border border-white/20 rounded-3xl p-6">
                  <p className="text-lg leading-relaxed whitespace-normal">
                    “MacBook Neo is a testament to our commitment to innovation and design excellence.”
                  </p>
                  <div className="mt-6 text-gray-400 text-sm text-right">   
                    <p className="text-white">Steve Jobs</p>
                    <p>Co-Founder</p>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>
    </main>
  );
}