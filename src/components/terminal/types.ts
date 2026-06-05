export type TerminalRoute =
  | 'launch'
  | 'diagnostic'
  | 'archive'
  | 'visual'
  | 'unknown'

export type HeartParticle = {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  drift: number
}

export type TerminalSequence = {
  command: string
  messages?: string[]
}