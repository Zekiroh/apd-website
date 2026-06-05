import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Braces,
  Code2,
  Cpu,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

type HeroSectionProps = {
  isPageReady: boolean
}

type CodeToken = {
  text: string
  className?: string
}

const codeRows: CodeToken[][] = [
  [{ text: '// FEU Diliman APD', className: 'text-white/40' }],
  [
    { text: 'const', className: 'text-fuchsia-400' },
    { text: ' ' },
    { text: 'mission', className: 'text-sky-300' },
    { text: ' = ', className: 'text-white/80' },
    { text: '"build with purpose"', className: 'text-lime-300' },
    { text: ';', className: 'text-white' },
  ],
  [
    { text: 'const', className: 'text-fuchsia-400' },
    { text: ' ' },
    { text: 'community', className: 'text-sky-300' },
    { text: ' = ', className: 'text-white/80' },
    { text: '[', className: 'text-white' },
  ],
  [{ text: '  "programmers",', className: 'text-lime-300' }],
  [{ text: '  "developers",', className: 'text-lime-300' }],
  [{ text: '  "designers",', className: 'text-lime-300' }],
  [{ text: '  "innovators"', className: 'text-lime-300' }],
  [{ text: '];', className: 'text-white' }],
  [
    { text: 'const', className: 'text-fuchsia-400' },
    { text: ' ' },
    { text: 'organization', className: 'text-sky-300' },
    { text: ' = ', className: 'text-white/80' },
    {
      text: '"Assemblage of Programmers and Developers"',
      className: 'text-yellow-300',
    },
    { text: ';', className: 'text-white' },
  ],
  [
    { text: 'launch', className: 'text-cyan-400' },
    { text: '(', className: 'text-white' },
    { text: 'APD', className: 'text-yellow-300' },
    { text: ', ', className: 'text-white' },
    { text: 'FEU-Diliman', className: 'text-orange-400' },
    { text: ');', className: 'text-white' },
  ],
]

export default function HeroSection({ isPageReady }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion()
  const codeBlockRef = useRef<HTMLDivElement | null>(null)
  const isCodeVisible = useInView(codeBlockRef, {
    once: true,
    amount: 0.75,
    margin: '0px 0px -25% 0px',
  })

  const [typedLength, setTypedLength] = useState(0)

  const shouldAnimate = shouldReduceMotion || isPageReady

  const totalCodeLength = useMemo(() => {
    return codeRows.reduce((total, row) => {
      return total + row.reduce((sum, token) => sum + token.text.length, 0)
    }, 0)
  }, [])

  useEffect(() => {
    if (shouldReduceMotion || !isCodeVisible || !isPageReady) {
      return
    }

    const startDelay = window.setTimeout(() => {
      const interval = window.setInterval(() => {
        setTypedLength((currentLength) => {
          if (currentLength >= totalCodeLength) {
            window.clearInterval(interval)
            return currentLength
          }

          return currentLength + 1
        })
      }, 22)

      return () => {
        window.clearInterval(interval)
      }
    }, 900)

    return () => {
      window.clearTimeout(startDelay)
    }
  }, [isCodeVisible, isPageReady, shouldReduceMotion, totalCodeLength])

  const renderTypedCode = () => {
    const visibleCodeLength = shouldReduceMotion ? totalCodeLength : typedLength

    let remainingCharacters = visibleCodeLength
    let cursorPlaced = false
    const isTypingComplete = visibleCodeLength >= totalCodeLength

    return codeRows.map((row, rowIndex) => {
      const rowLength = row.reduce(
        (sum, token) => sum + token.text.length,
        0,
      )

      const visibleCharacters = Math.min(
        Math.max(remainingCharacters, 0),
        rowLength,
      )

      const shouldShowCursor =
        (!cursorPlaced && remainingCharacters <= rowLength) ||
        (isTypingComplete && rowIndex === codeRows.length - 1)

      if (shouldShowCursor) {
        cursorPlaced = true
      }

      remainingCharacters -= rowLength

      let consumedCharacters = 0

      return (
        <p key={`code-row-${rowIndex}`}>
          {row.map((token, tokenIndex) => {
            const tokenStart = consumedCharacters
            const tokenEnd = tokenStart + token.text.length

            const visibleText = token.text.slice(
              0,
              Math.max(0, visibleCharacters - tokenStart),
            )

            consumedCharacters = tokenEnd

            if (!visibleText) return null

            return (
              <span
                key={`code-token-${rowIndex}-${tokenIndex}`}
                className={token.className}
              >
                {visibleText}
              </span>
            )
          })}

          {shouldShowCursor && (
            <span className="ml-px animate-pulse text-yellow-300">▍</span>
          )}
        </p>
      )
    })
  }

  return (
    <div className="relative z-10 mx-auto grid min-h-[calc(100vh-160px)] max-w-7xl items-center gap-14 pt-32 pb-16 sm:pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:pt-16">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={
            shouldAnimate
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.95 }
          }
          transition={{ delay: 0.25, duration: 0.55 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm text-yellow-200"
        >
          <Sparkles size={16} aria-hidden="true" />
          Official student tech organization
        </motion.div>

        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl"
        >
          Assemblage of{' '}
          <motion.span
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    backgroundPosition: ['0% center', '250% center'],
                  }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="bg-linear-to-r from-yellow-300 via-amber-300 to-yellow-500 bg-clip-text text-transparent"
            style={{
              backgroundSize: '250% auto',
            }}
          >
            Programmers
          </motion.span>{' '}
          and Developers
        </motion.h2>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mt-6 max-w-2xl text-lg leading-8 text-white/65"
        >
          A community of FEU Diliman students building skills, projects, and
          opportunities through technology, creativity, and collaboration.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-9 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#about"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-yellow-400 px-7 py-4 font-semibold text-black outline-none transition hover:bg-yellow-300 focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Explore APD
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="transition group-hover:translate-x-1"
            />
          </a>

          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 font-semibold text-white/80 outline-none transition hover:border-yellow-300/40 hover:bg-yellow-400/10 hover:text-white focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            View Projects
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={
          shouldReduceMotion ? false : { opacity: 0, x: 50, scale: 0.95 }
        }
        animate={
          shouldAnimate
            ? { opacity: 1, x: 0, scale: 1 }
            : { opacity: 0, x: 50, scale: 0.95 }
        }
        transition={{
          delay: 1,
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative"
        aria-hidden="true"
      >
        <motion.div
          animate={
            shouldAnimate && !shouldReduceMotion ? { y: [0, -4, 0] } : undefined
          }
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-3 top-8 z-20 flex h-9 w-9 items-center justify-center rounded-2xl border border-yellow-300/25 bg-black/80 text-yellow-300 shadow-lg shadow-yellow-500/15 sm:-left-6 sm:h-10 sm:w-10 xl:-left-10 xl:h-12 xl:w-12"
        >
          <Code2 className="h-4 w-4 sm:h-5 sm:w-5" />
        </motion.div>

        <motion.div
          animate={
            shouldAnimate && !shouldReduceMotion ? { y: [0, 4, 0] } : undefined
          }
          transition={{ duration: 7.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-6 -top-4 z-20 flex h-9 w-9 items-center justify-center rounded-2xl border border-yellow-300/25 bg-black/80 text-yellow-300 shadow-lg shadow-yellow-500/15 sm:right-10 sm:h-10 sm:w-10 xl:-top-6 xl:h-11 xl:w-11"
        >
          <Braces className="h-4 w-4 sm:h-5 sm:w-5" />
        </motion.div>

        <motion.div
          animate={
            shouldAnimate && !shouldReduceMotion ? { y: [0, 5, 0] } : undefined
          }
          transition={{ duration: 7.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-2 top-24 z-20 flex h-9 w-9 items-center justify-center rounded-2xl border border-yellow-300/25 bg-black/80 text-yellow-300 shadow-lg shadow-yellow-500/15 sm:-right-4 sm:h-10 sm:w-10 xl:-right-8 xl:top-28 xl:h-11 xl:w-11"
        >
          <Terminal className="h-4 w-4 sm:h-5 sm:w-5" />
        </motion.div>

        <motion.div
          animate={
            shouldAnimate && !shouldReduceMotion ? { y: [0, -4, 0] } : undefined
          }
          transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-4 left-10 z-20 flex h-9 w-9 items-center justify-center rounded-2xl border border-yellow-300/25 bg-black/80 text-yellow-300 shadow-lg shadow-yellow-500/15 sm:left-12 sm:h-10 sm:w-10"
        >
          <Cpu className="h-4 w-4 sm:h-5 sm:w-5" />
        </motion.div>

        <div className="absolute inset-0 rounded-4xl bg-yellow-400/6 blur-xl" />

        <div
          ref={codeBlockRef}
          className="relative z-10 animate-float rounded-4xl border border-yellow-300/20 bg-[#1e1e1e]/90 p-5 shadow-2xl shadow-yellow-500/10"
        >
          <div className="rounded-3xl border border-white/10 bg-[#252526] p-5">
            <div className="mb-5 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>

            <div className="space-y-4 font-mono text-sm">
              {renderTypedCode()}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}