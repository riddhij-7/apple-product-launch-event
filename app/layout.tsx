import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Apple MacBook Neo Launch Event',
    template: '%s | Apple MacBook Neo Launch',
  },
  description:
    'Join us for the launch of MacBook Neo. The most powerful MacBook ever made.',
  keywords: ['Apple', 'MacBook Neo', 'Apple Event', 'Product Launch'],
  openGraph: {
    title: 'Apple MacBook Neo Launch Event',
    description:
      'Join us for the launch of MacBook Neo. The most powerful MacBook ever made.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={inter.variable}>
      <body className="bg-black text-white antialiased">
      <Navbar />
      <main>{children}</main> 
      <Footer /> 
      </body>
    </html>
  )
}