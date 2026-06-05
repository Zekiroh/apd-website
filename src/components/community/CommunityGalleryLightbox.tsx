import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, type TouchEvent } from 'react'
import { createPortal } from 'react-dom'
import type { GalleryItem } from './types'

type CommunityGalleryLightboxProps = {
  item: GalleryItem
  activeImageIndex: number
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  onSelectImage: (imageIndex: number) => void
}

export default function CommunityGalleryLightbox({
  item,
  activeImageIndex,
  onClose,
  onNext,
  onPrevious,
  onSelectImage,
}: CommunityGalleryLightboxProps) {
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const hasMultipleImages = item.images.length > 1

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]

    if (!touch) return

    touchStartX.current = touch.clientX
    touchStartY.current = touch.clientY
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!hasMultipleImages) return

    const touch = event.changedTouches[0]

    if (
      !touch ||
      touchStartX.current === null ||
      touchStartY.current === null
    ) {
      return
    }

    const deltaX = touch.clientX - touchStartX.current
    const deltaY = touch.clientY - touchStartY.current

    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY)
    const hasEnoughSwipeDistance = Math.abs(deltaX) > 50

    if (isHorizontalSwipe && hasEnoughSwipeDistance) {
      if (deltaX < 0) {
        onNext()
      } else {
        onPrevious()
      }
    }

    touchStartX.current = null
    touchStartY.current = null
  }

  const lightboxContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} gallery`}
    >
      <div className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#07080a]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300">
              {item.category}
            </p>

            <h3 className="mt-1 text-xl font-bold sm:text-2xl">
              {item.title}
            </h3>
          </div>

          <button
            type="button"
            aria-label="Close gallery"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-yellow-300/40 hover:bg-yellow-400/10 hover:text-yellow-200"
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="relative flex min-h-[55vh] touch-pan-y items-center justify-center bg-black"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={item.images[activeImageIndex]}
            alt={item.title}
            className="max-h-[70vh] w-full select-none object-contain"
            draggable={false}
          />

          {hasMultipleImages && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={onPrevious}
                className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/75 transition hover:border-yellow-300/40 hover:bg-yellow-400/10 hover:text-yellow-200 sm:flex"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                aria-label="Next image"
                onClick={onNext}
                className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/75 transition hover:border-yellow-300/40 hover:bg-yellow-400/10 hover:text-yellow-200 sm:flex"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {hasMultipleImages && (
          <div className="flex items-center justify-center gap-2 border-t border-white/10 px-5 py-4">
            {item.images.map((image, imageIndex) => (
              <button
                key={image}
                type="button"
                aria-label={`View ${item.title} image ${imageIndex + 1}`}
                onClick={() => onSelectImage(imageIndex)}
                className={`h-1.5 rounded-full transition-all ${
                  imageIndex === activeImageIndex
                    ? 'w-8 bg-yellow-300'
                    : 'w-2 bg-white/35 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return createPortal(lightboxContent, document.body)
}