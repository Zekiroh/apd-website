import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import apdLogo from '../assets/apd-logo.png'

const joinApdFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLScg1nddFxMa8atxU2ydXxOWrUVDZ7HHjUC030Dz0xySVsbTUg/viewform'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'works', label: 'What We Do' },
  { id: 'projects', label: 'Projects' },
  { id: 'officers', label: 'Officers' },
  { id: 'events', label: 'Events' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)

      const current = sections.find((section) => {
        const element = document.getElementById(section.id)

        if (!element) return false

        const rect = element.getBoundingClientRect()

        return rect.top <= 140 && rect.bottom >= 140
      })

      if (current) {
        setActiveSection(current.id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`sticky top-4 z-50 mx-auto max-w-7xl rounded-2xl border px-4 py-4 transition-all duration-300 sm:px-5 ${
        scrolled
          ? 'border-yellow-300/20 bg-black/70 shadow-lg shadow-yellow-500/10 backdrop-blur-2xl'
          : 'border-white/10 bg-white/3 backdrop-blur-xl'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <a
          href="#"
          onClick={closeMenu}
          className="flex min-w-0 items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
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
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
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
                    onClick={closeMenu}
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