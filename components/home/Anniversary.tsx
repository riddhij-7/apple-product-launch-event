'use client'
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],   
});

const GALLERY = [
  {
    label: "Tim Cook greets the crowd at Apple Park.",
    span: 1,
    accent: "#f5e642",
    src: "/images/501.jpg",
  },
  {
    label: "Paul McCartney performs at Apple Park in Cupertino, the grand finale of Apple’s 50th anniversary celebrations.",
    span: 1,
    accent: "#f4a7b9",
    src: "/images/502.jpg",
  },
  {
    label: "To celebrate Apple’s 50th anniversary, Molly Yllom, the artist behind the Crybaby universe, led a special Today at Apple session at Apple Iconsiam in Bangkok.",
    span: 1,
    accent: "#7aa7d2",
    src: "/images/creator.jpg",
  },
  {
    label: "Marcus Mumford of Mumford & Sons takes the stage at Apple Battersea in London.",
    span: 1,
    accent: "#c8c8c8",
    src: "/images/503.jpg",
  },
  {
    label: "Tim Cook and Alicia Keys greet the audience at Apple’s 50th anniversary celebration in New York City.",
    span: 1,
    accent: "#f4a7b9",
    src: "/images/511.jpg",
  },
  {
    label: "Andy 4000 and disiz perform at Apple Champs-Élysées.",
    span: 1,
    accent: "#7aa7d2",
    src: "/images/505.jpg",
  },
  {
    label: "Musician BoomBass, one half of the celebrated duo Cassius, takes part in a Today at Apple session at Apple Champs-Élysées.",
    span: 2,
    accent: "#f5e642",
    src: "/images/506.jpg",
  },
  {
    label: "Designer Feng Chen Wang greets attendees at Apple Jing’an.",
    span: 1,
    accent: "#c8c8c8",
    src: "/images/507.jpg",
  },
  {
    label: "Tim Cook poses for a selfie with Chris Lee and her dancers at Apple Taikoo Li Chengdu.",
    span: 1,
    accent: "#7aa7d2",
    src: "/images/508.jpg",
  },
  {
    label: "Illuminating Creativity transforms the Sydney Opera House’s.",
    span: 1,
    accent: "#f4a7b9",
    src: "/images/509.jpg",
  },
  {
    label: "At Apple BKC in Mumbai, a playful mural by visual artist and illustrator Mira Felicia Malhotra pays tribute to the city’s vibrant creative community.",
    span: 1,
    accent: "#c8c8c8",
    src: "/images/510.jpg",
  },
];
export default function Anniversary() {
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white text-center mt-30">
      <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold mb-4`}>
        <span className="neo-smooth">50 years </span>of thinking differently</h2>
      <p className="mb-6 font-xs max-w-2xl text-white/100 text-2xl md:text-sm leading-relaxed">
        Join us as we celebrate 50 years of groundbreaking technology and design with a new product launch that pays homage to our legacy while looking boldly into the future.
      </p>
      <p className="mb-6 font-xs max-w-2xl text-white/100 text-2xl md:text-sm leading-relaxed">Photos 1 April 2026.</p>
      <p className="mb-6 font-xs max-w-2xl text-white/100 text-2xl md:text-lg leading-relaxed">
      </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">      
        {GALLERY.map((item, index) => (
          <div key={index} className={`relative rounded-lg overflow-hidden border-2`} style={{ borderColor: item.accent }}>
            <img src={item.src} alt={item.label} className="w-full h-48 object-cover" />    
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <p className="text-white text-sm px-2">{item.label}</p>
            </div>
          </div>
        ))}
        </div>
    </div>
    
  )
}