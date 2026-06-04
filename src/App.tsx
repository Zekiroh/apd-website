import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import AboutSection from './components/AboutSection'
import EventsSection from './components/EventsSection'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import OfficersSection from './components/OfficersSection'
import ProjectsSection from './components/ProjectsSection'
import RecognitionSection from './components/RecognitionSection'
import ScrollToTopButton from './components/ScrollToTopButton'
import WhatWeDoSection from './components/WhatWeDoSection'

const loaderSessionKey = 'apd-loader-shown'

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseInside, setIsMouseInside] = useState(false)
  const [isLoading, setIsLoading] = useState(() => {
    return sessionStorage.getItem(loaderSessionKey) !== 'true'
  })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      })

      setIsMouseInside(true)
    }

    const handleMouseLeave = () => {
      setIsMouseInside(false)
    }

    const handleMouseEnter = () => {
      setIsMouseInside(true)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  const completeLoading = useCallback(() => {
    sessionStorage.setItem(loaderSessionKey, 'true')
    setIsLoading(false)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={completeLoading} />}
      </AnimatePresence>

      <main className="relative min-h-screen overflow-hidden bg-[#050607] text-white">
        {/* Global Tech Grid */}
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Global Golden Beam */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -right-62.5 -top-25 h-550 w-125 rotate-12 bg-yellow-400/[0.035] blur-[180px]" />
        </div>

        {/* Global Vignette */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background:
              'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* Mouse Glow */}
        <div
          className={`pointer-events-none fixed inset-0 z-20 transition-opacity duration-500 ${
            isMouseInside ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(
              650px circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(245, 197, 66, 0.18),
              transparent 40%
            )`,
          }}
        />

        <section className="relative min-h-screen px-6 py-6">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-40 top-20 h-96 w-96 animate-pulse-glow rounded-full bg-yellow-400/20 blur-3xl" />

            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

            <div className="absolute left-1/2 top-1/2 h-175 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/5 blur-[180px]" />
          </div>

          <Navbar />
          <HeroSection />
        </section>

        <AboutSection />
        <WhatWeDoSection />
        <ProjectsSection />
        <OfficersSection />
        <EventsSection />
        <RecognitionSection />
        <Footer />
        <ScrollToTopButton />
      </main>
    </>
  )
}