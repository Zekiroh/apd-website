import { X } from 'lucide-react'

type CommunityVideoModalProps = {
  eyebrow: string
  title: string
  videoSrc: string
  onClose: () => void
}

export default function CommunityVideoModal({
  eyebrow,
  title,
  videoSrc,
  onClose,
}: CommunityVideoModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#08090b] shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300">
              {eyebrow}
            </p>

            <h3 className="mt-1 text-xl font-bold sm:text-2xl">{title}</h3>
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