import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
}

export default function Reveal({
  children,
  delay = 0,
  className = '',
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -8% 0px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      style={{
        willChange: shouldReduceMotion ? 'auto' : 'opacity, transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </motion.div>
  )
}