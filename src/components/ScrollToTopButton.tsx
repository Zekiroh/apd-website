import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

type ScrollToTopButtonProps = {
  hidden?: boolean
}

export default function ScrollToTopButton({
  hidden = false,
}: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isOverlayActive, setIsOverlayActive] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const projectsSection = document.getElementById('projects')

      if (!projectsSection) {
        setIsVisible(false)
        return
      }

      const rect = projectsSection.getBoundingClientRect()

      setIsVisible(rect.top <= window.innerHeight * 0.5)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    const checkOverlayState = () => {
      setIsOverlayActive(
        document.body.style.overflow === 'hidden' ||
          document.documentElement.style.overflow === 'hidden',
      )
    }

    const observer = new MutationObserver(checkOverlayState)

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })

    checkOverlayState()

    return () => {
      observer.disconnect()
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && !hidden && !isOverlayActive && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 18, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.92 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-yellow-300/25 bg-black/70 text-yellow-300 shadow-lg shadow-yellow-500/20 backdrop-blur-xl outline-none transition hover:border-yellow-300/50 hover:bg-yellow-400 hover:text-black focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}