import { X } from 'lucide-react'
import { useEffect } from 'react'

type CommunityVideoModalProps = {
  videoSrc: string
  onClose: () => void
}

export default function CommunityVideoModal({
  videoSrc,
  onClose,
}: CommunityVideoModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-md">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#07080a]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Leadership Video
            </p>

            <h3 className="mt-1 text-xl font-bold sm:text-2xl">
              APD Leadership SY2425
            </h3>
          </div>

          <button
            type="button"
            aria-label="Close video"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-yellow-300/40 hover:bg-yellow-400/10 hover:text-yellow-200"
          >
            <X size={20} />
          </button>
        </div>

        <video
          src={videoSrc}
          controls
          autoPlay
          className="max-h-[72vh] w-full bg-black sm:max-h-[78vh]"
        />
      </div>
    </div>
  )
}