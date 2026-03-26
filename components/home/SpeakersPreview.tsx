"use client";

import Image from "next/image";
import Link from "next/link";

const speakers = [
  {
    name: "Tim Cook",
    role: "CEO, Apple",
    image: "/images/timcook.jpg",
  },
  {
    name: "Steve Jobs",
    role: "Founder, Apple",
    image: "/images/stevejobs.jpg",
  },
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
    name: "Steve Wozniak",
    role: "Co-founder, Apple",
    image: "/images/steve.jpg",
  },
];

export default function SpeakersPreview() {
  return (
    <section className="w-full bg-[#000] py-24 px-6 flex justify-center">
      <div className="max-w-6xl w-full bg-[#f5f5f7] rounded-3xl p-10 md:p-16 text-center relative">

        <h1 className="text-3xl md:text-5xl font-semibold text-black leading-tight">
          Introducing the Minds Behind
          <br />
          MacBook Neo
        </h1>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Hear from the innovators, designers, and engineers shaping the future of Apple.
          Get insights directly from the people behind the breakthrough.
        </p>

        <div className="mt-12 flex gap-6 overflow-x-auto px-2 no-scrollbar py-4">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="min-w-[160px] h-[240px] rounded-2xl overflow-hidden relative shadow-md transition duration-300 hover:scale-105"
            >
              <Image
                src={speaker.image}
                alt={speaker.name}
                fill
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute bottom-0 w-full bg-black/60 text-white p-3 h-[70px] flex flex-col justify-center">
                <p className="text-sm font-semibold">{speaker.name}</p>
                <p className="text-xs text-gray-300">{speaker.role}</p>
              </div>
            </div>
          ))}
        </div>

        <Link href="/speakers">
        <div className="mt-10 flex justify-center group cursor-pointer">
        <span className="text-black text-lg font-medium flex items-center gap-2 transition-all duration-300 group-hover:gap-4">
          Explore Speakers
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
  </Link>
      </div>
    </section>
  );
}