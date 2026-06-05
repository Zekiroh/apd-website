import { ExternalLink, X } from 'lucide-react'
import { useEffect } from 'react'

type CommunityVideoModalProps = {
  eyebrow: string
  title: string
  videoSrc: string
  videoUrl?: string
  onClose: () => void
}

export default function CommunityVideoModal({
  eyebrow,
  title,
  videoSrc,
  videoUrl,
  onClose,
}: CommunityVideoModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    window.dispatchEvent(
      new CustomEvent('apd-video-modal-change', { detail: true }),
    )

    return () => {
      document.body.style.overflow = previousOverflow
      window.dispatchEvent(
        new CustomEvent('apd-video-modal-change', { detail: false }),
      )
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-5 sm:py-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="flex max-h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#08090b] shadow-2xl shadow-black/50">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300">
              {eyebrow}
            </p>

            <h3 className="mt-1 text-xl font-bold sm:text-2xl">{title}</h3>

            {videoUrl && (
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-yellow-300/80 transition hover:text-yellow-200"
              >
                Watch on Facebook
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            )}
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

        <div className="flex min-h-0 flex-1 items-center justify-center bg-black">
          <video
            src={videoSrc}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="aspect-video max-h-[72vh] w-full bg-black object-contain sm:max-h-[74vh]"
          />
        </div>
      </div>
    </div>
  )
}