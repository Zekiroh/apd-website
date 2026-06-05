import type { HeartParticle, TerminalRoute } from './types'

const commandMap: Record<string, TerminalRoute> = {
  'npm run apd': 'launch',
  'npm run dev': 'diagnostic',

  'd2hhdCBpZg==': 'archive',
  'aGVhcnQ=': 'visual',
}

export const encodeCommand = (value: string) => {
  return btoa(value)
}

export const resolveTerminalRoute = (command: string): TerminalRoute => {
  const normalizedCommand = command.trim().toLowerCase()
  const encodedCommand = encodeCommand(normalizedCommand)

  return commandMap[normalizedCommand] ?? commandMap[encodedCommand] ?? 'unknown'
}

export const generateHeartParticles = (): HeartParticle[] => {
  return Array.from({ length: 24 }, (_, index) => ({
    id: Date.now() + index,
    left: 8 + Math.random() * 84,
    delay: Math.random() * 0.8,
    duration: 2.4 + Math.random() * 1.6,
    size: 14 + Math.random() * 14,
    drift: -30 + Math.random() * 60,
  }))
}