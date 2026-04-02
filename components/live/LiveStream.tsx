"use client";

import { useEffect, useState } from "react";

export default function LiveStream() {
  const [messages, setMessages] = useState<string[]>([
    "User1: Hello!",
    "User2: Nice stream",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) => [
        ...prev,
        `User${Math.floor(Math.random() * 100)}: Awesome!`,
        `User${Math.floor(Math.random() * 100)}: Loving this!`,
        `User${Math.floor(Math.random() * 100)}: Great!`,
        `User${Math.floor(Math.random() * 100)}: So cool!`,
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
  <div className="min-h-screen bg-black flex items-center justify-center">
    
    
    <div className="w-[90%] max-w-6xl h-[80vh] flex rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      
      
      <div className="flex-[3] relative bg-black">
        <span className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded text-sm font-semibold">
          LIVE
        </span>

        <video
          src="/video.mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
      </div>

      
      <div className="flex-[1] bg-gray-500 p-4 overflow-y-auto">
        <h2 className="text-white font-semibold mb-4">Live Chat</h2>

        {messages.map((msg, i) => (
          <p key={i} className="text-sm text-white/80 mb-2">
            {msg}
          </p>
        ))}
      </div>

    </div>
  </div>
)
}