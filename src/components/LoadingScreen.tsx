import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type LoadingScreenProps = {
  onComplete: () => void
}

const bootLines = [
  'Compiling organization...',
  'Building community...',
  'Connecting developers...',
]

const launchCommand = 'npm run apd'

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const shouldReduceMotion = useReducedMotion()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [hasStarted, setHasStarted] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [visibleLineCount, setVisibleLineCount] = useState(0)

  const [readyTime] = useState(() =>
    (Math.random() * (1.2 - 0.6) + 0.6).toFixed(1),
  )

  const startBootSequence = () => {
    if (inputRef.current) {
      inputRef.current.value = launchCommand
    }

    setHasError(false)
    setHasStarted(true)
  }

  const handleSubmit = () => {
    if (hasStarted) return

    const currentCommand = inputRef.current?.value ?? ''

    if (currentCommand.trim().toLowerCase() === launchCommand) {
      startBootSequence()
      return
    }

    setHasError(true)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleCommandInput = () => {
    if (hasError) {
      setHasError(false)
    }
  }

  const getBootLineClassName = (isVisible: boolean, className = '') => {
    const baseClassName =
      'transition-[opacity,transform] duration-300 ease-out will-change-auto'

    if (shouldReduceMotion) {
      return `${baseClassName} translate-x-0 opacity-100 ${className}`.trim()
    }

    return `${baseClassName} ${
      isVisible ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
    } ${className}`.trim()
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (shouldReduceMotion) {
      const timeout = window.setTimeout(() => {
        onComplete()
      }, 100)

      return () => {
        window.clearTimeout(timeout)
      }
    }
  }, [onComplete, shouldReduceMotion])

  useEffect(() => {
    if (!hasStarted || shouldReduceMotion) return

    const lineInterval = window.setInterval(() => {
      setVisibleLineCount((currentCount) => {
        if (currentCount >= bootLines.length + 2) {
          window.clearInterval(lineInterval)
          return currentCount
        }

        return currentCount + 1
      })
    }, 700)

    const completeTimeout = window.setTimeout(() => {
      onComplete()
    }, 4000)

    return () => {
      window.clearInterval(lineInterval)
      window.clearTimeout(completeTimeout)
    }
  }, [hasStarted, onComplete, shouldReduceMotion])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-[#050607] px-6 text-white"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/15 blur-2xl md:blur-3xl" />
      </div>

      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 18,
                scale: 0.98,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative w-full max-w-xl rounded-3xl border border-yellow-300/20 bg-black/60 p-5 shadow-2xl shadow-yellow-500/10 backdrop-blur-md sm:p-6 md:backdrop-blur-xl"
      >
        <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
            APD Terminal
          </p>
        </div>

        <div className="min-h-56 space-y-3 font-mono text-sm leading-7 text-white/75 sm:text-base">
          {!hasStarted && (
            <>
              <p className="text-white/50">Type the command to launch APD.</p>

              <div className="flex items-center gap-2">
                <span className="text-yellow-300">&gt;</span>

                <input
                  ref={inputRef}
                  defaultValue=""
                  onInput={handleCommandInput}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-white caret-yellow-300 outline-none placeholder:text-white/25"
                  placeholder="npm run apd"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>

              {hasError && (
                <p className="translate-y-0 text-red-300 opacity-100 transition-[opacity,transform] duration-300 ease-out">
                  Command not recognized. Try: npm run apd
                </p>
              )}

              <p className="pt-4 text-xs leading-6 text-white/35 sm:text-sm">
                Type "npm run apd" and press Enter to continue.
              </p>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={onComplete}
                  className="text-xs uppercase tracking-wider text-yellow-300 transition hover:text-yellow-200"
                >
                  Skip Boot →
                </button>
              </div>
            </>
          )}

          {hasStarted && (
            <>
              <p>
                <span className="text-yellow-300">&gt;</span>{' '}
                <span className="text-white">{launchCommand}</span>
              </p>

              <div className="pt-2">
                {bootLines.map((line, index) => (
                  <p
                    key={line}
                    className={getBootLineClassName(
                      visibleLineCount > index,
                      'text-white/60',
                    )}
                  >
                    {line}
                  </p>
                ))}
              </div>

              <p
                className={getBootLineClassName(
                  visibleLineCount > bootLines.length,
                  'pt-2 text-emerald-300',
                )}
              >
                ✓ Ready in {readyTime}s
              </p>

              <p
                className={getBootLineClassName(
                  visibleLineCount > bootLines.length + 1,
                  'text-yellow-300',
                )}
              >
                launch(APD);
                <span className="ml-1 motion-safe:animate-pulse">▍</span>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}