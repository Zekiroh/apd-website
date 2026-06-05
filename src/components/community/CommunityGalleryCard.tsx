import { useCallback, useEffect, useRef, useState } from 'react'
import type { TouchEvent } from 'react'
import Reveal from '../Reveal'
import type { GalleryItem } from './types'

type CommunityGalleryCardProps = {
  item: GalleryItem
  index: number
  onOpen: (imageIndex: number) => void
}

const AUTO_SLIDE_DELAY = 5000
const SWIPE_THRESHOLD = 50

export default function CommunityGalleryCard({
  item,
  index,
  onOpen,
}: CommunityGalleryCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const didSwipeRef = useRef(false)

  const hasMultipleImages = item.images.length > 1

  const goToNextImage = useCallback(() => {
    setActiveImageIndex((currentIndex) =>
      currentIndex === item.images.length - 1 ? 0 : currentIndex + 1,
    )
  }, [item.images.length])

  const goToPreviousImage = useCallback(() => {
    setActiveImageIndex((currentIndex) =>
      currentIndex === 0 ? item.images.length - 1 : currentIndex - 1,
    )
  }, [item.images.length])

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]

    if (!touch) return

    touchStartX.current = touch.clientX
    touchStartY.current = touch.clientY
    didSwipeRef.current = false
    setIsPaused(true)
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null ||
      !hasMultipleImages
    ) {
      setIsPaused(false)
      return
    }

    const touch = event.changedTouches[0]

    if (!touch) {
      setIsPaused(false)
      return
    }

    const deltaX = touch.clientX - touchStartX.current
    const deltaY = touch.clientY - touchStartY.current

    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY)
    const hasEnoughSwipeDistance = Math.abs(deltaX) > SWIPE_THRESHOLD

    if (isHorizontalSwipe && hasEnoughSwipeDistance) {
      didSwipeRef.current = true

      if (deltaX < 0) {
        goToNextImage()
      } else {
        goToPreviousImage()
      }
    }

    touchStartX.current = null
    touchStartY.current = null
    setIsPaused(false)

    window.setTimeout(() => {
      didSwipeRef.current = false
    }, 120)
  }

  const handleOpenGallery = () => {
    if (didSwipeRef.current) return

    onOpen(activeImageIndex)
  }

  const handleSelectImage = (imageIndex: number) => {
    setActiveImageIndex(imageIndex)
  }

  useEffect(() => {
    if (!hasMultipleImages || isPaused) return

    const timeout = window.setTimeout(goToNextImage, AUTO_SLIDE_DELAY)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [activeImageIndex, goToNextImage, hasMultipleImages, isPaused])

  return (
    <Reveal delay={0.25 + index * 0.08}>
      <div
        className="group relative h-88 overflow-hidden rounded-3xl border border-white/10 bg-white/3 transition hover:-translate-y-2 hover:border-yellow-300/40"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          aria-label={`Open ${item.title} gallery`}
          onClick={handleOpenGallery}
          className="absolute inset-0 z-10 cursor-pointer"
        />

        {item.images.map((image, imageIndex) => (
          <img
            key={image}
            src={image}
            alt={item.title}
            className={`absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
              imageIndex === activeImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            draggable={false}
          />
        ))}

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/35 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300">
            {item.category}
          </p>

          <h4 className="mt-2 text-2xl font-bold">{item.title}</h4>

          {hasMultipleImages && (
            <div className="absolute bottom-7 right-7 z-20 flex gap-2">
              {item.images.map((image, imageIndex) => (
                <button
                  key={image}
                  type="button"
                  aria-label={`View ${item.title} image ${imageIndex + 1}`}
                  onClick={() => handleSelectImage(imageIndex)}
                  className={`h-1.5 rounded-full transition-all ${
                    imageIndex === activeImageIndex
                      ? 'w-6 bg-yellow-300'
                      : 'w-1.5 bg-white/35 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  )
}