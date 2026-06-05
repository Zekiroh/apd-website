import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import apdLogo from '../assets/apd-logo.png'

const joinApdFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLScg1nddFxMa8atxU2ydXxOWrUVDZ7HHjUC030Dz0xySVsbTUg/viewform'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'works', label: 'What We Do' },
  { id: 'community', label: 'Community' },
  { id: 'projects', label: 'Projects' },
  { id: 'events', label: 'Events' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const shouldReduceMotion = useReducedMotion()
  const previousScrollY = useRef(0)

  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  useEffect(() => {
    const handleVideoModalChange = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>
      const isOpen = Boolean(customEvent.detail)

      setIsVideoModalOpen(isOpen)

      if (isOpen) {
        setIsMenuOpen(false)
        setIsNavbarVisible(false)
      }
    }

    window.addEventListener(
      'apd-video-modal-change',
      handleVideoModalChange as EventListener,
    )

    return () => {
      window.removeEventListener(
        'apd-video-modal-change',
        handleVideoModalChange as EventListener,
      )
    }
  }, [])

  useEffect(() => {
    let ticking = false

    const updateNavigationState = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > previousScrollY.current
      const isNearTop = currentScrollY < 80

      setScrolled(currentScrollY > 30)

      if (isVideoModalOpen) {
        setIsNavbarVisible(false)
        previousScrollY.current = currentScrollY
        ticking = false
        return
      }

      setIsNavbarVisible(
        isNearTop ||
          !isScrollingDown ||
          isMenuOpen ||
          shouldReduceMotion === true,
      )

      previousScrollY.current = currentScrollY

      const firstSection = document.getElementById(sections[0].id)

      if (firstSection) {
        const firstSectionTop = firstSection.getBoundingClientRect().top

        if (firstSectionTop > 160) {
          setActiveSection('')
          ticking = false
          return
        }
      }

      const current = sections.find((section) => {
        const element = document.getElementById(section.id)

        if (!element) return false

        const rect = element.getBoundingClientRect()

        return rect.top <= 160 && rect.bottom >= 160
      })

      setActiveSection(current?.id ?? '')
      ticking = false
    }

    const handleScroll = () => {
      if (ticking) return

      ticking = true
      window.requestAnimationFrame(updateNavigationState)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateNavigationState()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMenuOpen, isVideoModalOpen, shouldReduceMotion])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleMobileNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId)

    setIsMenuOpen(false)

    window.setTimeout(() => {
      element?.scrollIntoView({
        behavior: shouldReduceMotion === true ? 'auto' : 'smooth',
        block: 'start',
      })
    }, 100)
  }

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={shouldReduceMotion === true ? false : { opacity: 0, y: -20 }}
      animate={{
        opacity: isNavbarVisible ? 1 : 0,
        y: isNavbarVisible ? 0 : -110,
      }}
      transition={{
        duration: shouldReduceMotion === true ? 0 : 0.28,
        ease: 'easeOut',
      }}
      className={`fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 rounded-2xl border px-4 py-4 transition-all duration-300 sm:px-5 ${
        isNavbarVisible ? 'pointer-events-auto' : 'pointer-events-none'
      } ${
        scrolled
          ? 'border-yellow-300/20 bg-black/80 shadow-lg shadow-yellow-500/10 backdrop-blur-md'
          : 'border-white/10 bg-[#101112]/85 backdrop-blur-md'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <a
          href="#"
          onClick={closeMenu}
          className="flex min-w-0 items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          aria-label="Go to top"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-yellow-300/20 bg-black/40 p-1.5 shadow-lg shadow-yellow-500/10 sm:h-12 sm:w-12">
            <img
              src={apdLogo}
              alt="APD Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <h1 className="text-base font-bold tracking-wide md:text-lg">
              APD
            </h1>

            <p className="hidden truncate text-xs text-white/50 sm:block">
              Assemblage of Programmers and Developers
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-8 text-sm lg:flex">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={activeSection === section.id ? 'page' : undefined}
              className={`relative rounded-md outline-none transition focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                activeSection === section.id
                  ? 'text-yellow-300'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {section.label}

              {activeSection === section.id && (
                <motion.span
                  layoutId="active-nav"
                  className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-yellow-300"
                  transition={
                    shouldReduceMotion === true
                      ? { duration: 0 }
                      : { duration: 0.25, ease: 'easeOut' }
                  }
                />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={joinApdFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-black outline-none transition hover:bg-yellow-300 focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:inline-flex"
          >
            Join APD
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label={
              isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={isMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white outline-none transition hover:border-yellow-300/40 hover:bg-yellow-400/10 hover:text-yellow-300 focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black lg:hidden"
          >
            {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={
              shouldReduceMotion === true
                ? false
                : { opacity: 0, y: -8, height: 0 }
            }
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={
              shouldReduceMotion === true
                ? { opacity: 0 }
                : { opacity: 0, y: -8, height: 0 }
            }
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden lg:hidden"
          >
            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="grid gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    aria-current={
                      activeSection === section.id ? 'page' : undefined
                    }
                    onClick={(event) => {
                      event.preventDefault()
                      handleMobileNavigation(section.id)
                    }}
                    className={`rounded-xl px-4 py-3 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                      activeSection === section.id
                        ? 'bg-yellow-400/10 text-yellow-300'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {section.label}
                  </a>
                ))}

                <a
                  href={joinApdFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-yellow-400 px-5 py-3 text-sm font-semibold text-black outline-none transition hover:bg-yellow-300 focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:hidden"
                >
                  Join APD
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}