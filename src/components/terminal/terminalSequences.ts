import systemAudio from '../../assets/audio/blue-sky.mp3'
import type { TerminalRoute, TerminalSequence } from './types'

const decode = (value: string) => atob(value)

export const TERMINAL_AUDIO_SOURCE = systemAudio

export const TERMINAL_SEQUENCES: Partial<
  Record<TerminalRoute, TerminalSequence>
> = {
  launch: {
    command: decode('bnBtIHJ1biBhcGQ='),
  },
  diagnostic: {
    command: decode('bnBtIHJ1biBkZXY='),
    messages: [
      decode('bXVzY2xlIG1lbW9yeSBIQUhBSEFIQQ=='),
      decode('d3JvbmcgcHJvamVjdCBib3NzIPCfmII='),
    ],
  },
  archive: {
    command: decode('d2hhdCBpZg=='),
    messages: [
      decode('aGkgaGVhcnQgOik='),
      decode('d2hhdCBpZi4uLi4uLi4uLi4='),
    ],
  },
  visual: {
    command: decode('aGVhcnQ='),
  },
}

export const getTerminalSequence = (route: TerminalRoute) => {
  return TERMINAL_SEQUENCES[route] ?? null
}