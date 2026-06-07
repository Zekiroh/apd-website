import alert01 from '../../assets/audio/system/system-alert-01.mp3'
import alert02 from '../../assets/audio/system/system-alert-02.mp3'
import alert03 from '../../assets/audio/system/system-alert-03.mp3'
import alert04 from '../../assets/audio/system/system-alert-04.mp3'
import alert05 from '../../assets/audio/system/system-alert-05.mp3'
import diagnosticAlert from '../../assets/audio/system/system-alert-06.mp3'

const TERMINAL_ERROR_AUDIO_POOL = [
  alert01,
  alert02,
  alert03,
  alert04,
  alert05,
]

export const playTerminalErrorAudio = () => {
  const randomAudio =
    TERMINAL_ERROR_AUDIO_POOL[
      Math.floor(Math.random() * TERMINAL_ERROR_AUDIO_POOL.length)
    ]

  const audio = new Audio(randomAudio)

  audio.volume = 1
  audio.play().catch(() => {})
}

export const playTerminalDiagnosticAudio = () => {
  const audio = new Audio(diagnosticAlert)

  audio.volume = 1
  audio.play().catch(() => {})
}