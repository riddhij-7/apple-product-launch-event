'use client'
import { useRouter } from "next/navigation"

export default function LiveStream() {
    const router = useRouter(); 
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white text-center mt-10">
  
        <p className="mb-6 font-xs max-w-2xl text-white/100 text-2xl md:text-xl leading-relaxed">
          Can&#39;t make it to the event?<br>
          </br> Watch the live stream and be part of the excitement as it unfolds!
        </p>

        <button
          onClick={() => router.push("/live")}
          className="bg-blue-600 px-6 py-3 rounded-full text-lg hover:bg-blue-700"
        >
          View Live Stream
        </button>

      </div>
    )
}