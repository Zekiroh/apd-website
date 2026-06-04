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

  const [command, setCommand] = useState('')
  const [hasStarted, setHasStarted] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [visibleLineCount, setVisibleLineCount] = useState(0)

  const [readyTime] = useState(() =>
    (Math.random() * (1.2 - 0.6) + 0.6).toFixed(1),
  )

  const startBootSequence = () => {
    setCommand(launchCommand)
    setHasError(false)
    setHasStarted(true)
  }

  const handleSubmit = () => {
    if (hasStarted) return

    if (command.trim().toLowerCase() === launchCommand) {
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
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/15 blur-3xl" />
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
        className="relative w-full max-w-xl rounded-3xl border border-yellow-300/20 bg-black/60 p-5 shadow-2xl shadow-yellow-500/10 backdrop-blur-xl sm:p-6"
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
                  value={command}
                  onChange={(event) => {
                    setCommand(event.target.value)
                    setHasError(false)
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-white caret-yellow-300 outline-none placeholder:text-white/25"
                  placeholder="npm run apd"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>

              {hasError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-300"
                >
                  Command not recognized. Try: npm run apd
                </motion.p>
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
                  <motion.p
                    key={line}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: -8,
                          }
                    }
                    animate={{
                      opacity: visibleLineCount > index ? 1 : 0,
                      x: visibleLineCount > index ? 0 : -8,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-white/60"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.p
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: -8,
                      }
                }
                animate={{
                  opacity: visibleLineCount > bootLines.length ? 1 : 0,
                  x: visibleLineCount > bootLines.length ? 0 : -8,
                }}
                transition={{ duration: 0.3 }}
                className="pt-2 text-emerald-300"
              >
                ✓ Ready in {readyTime}s
              </motion.p>

              <motion.p
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: -8,
                      }
                }
                animate={{
                  opacity: visibleLineCount > bootLines.length + 1 ? 1 : 0,
                  x: visibleLineCount > bootLines.length + 1 ? 0 : -8,
                }}
                transition={{ duration: 0.3 }}
                className="text-yellow-300"
              >
                launch(APD);
                <span className="ml-1 animate-pulse">▍</span>
              </motion.p>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}