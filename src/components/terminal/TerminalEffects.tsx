import { motion } from 'framer-motion'
import type { HeartParticle } from './types'

type TerminalEffectsProps = {
  particles: HeartParticle[]
}

export default function TerminalEffects({ particles }: TerminalEffectsProps) {
  return (
    <>
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          initial={{
            opacity: 0,
            y: 24,
            x: 0,
            scale: 0.65,
          }}
          animate={{
            opacity: [0, 1, 0.9, 0],
            y: -220,
            x: particle.drift,
            scale: [0.65, 1, 1.12],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'easeOut',
          }}
          className="pointer-events-none absolute z-20 text-yellow-300 drop-shadow-[0_0_10px_rgba(250,204,21,0.35)]"
          style={{
            left: `${particle.left}%`,
            bottom: '4.5rem',
            fontSize: `${particle.size}px`,
          }}
        >
          ❤
        </motion.span>
      ))}
    </>
  )
}