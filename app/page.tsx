import HeroSection from '@/components/home/HeroSection'
import EventHighlights from '@/components/home/EventHighlights'
import SpeakersPreview from '@/components/home/SpeakersPreview'
import LiveStream from '@/components/home/livestream'
import Anniversary from '@/components/home/Anniversary'


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EventHighlights />
      <SpeakersPreview />
      <LiveStream />
      <Anniversary />
    
    </>
  )
}