import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import apdLogo from '../assets/apd-logo.png'
import {
  communityFeaturedStories,
  communityGalleryItems,
  communityHighlights,
  communityValues,
} from '../data/landingPageData'
import CommunityGalleryCard from './community/CommunityGalleryCard'
import CommunityGalleryLightbox from './community/CommunityGalleryLightbox'
import CommunityVideoModal from './community/CommunityVideoModal'
import Reveal from './Reveal'

export default function CommunityCultureSection() {
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<
    number | null
  >(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [activeStoryIndex, setActiveStoryIndex] = useState(0)
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const activeStory = communityFeaturedStories[activeStoryIndex]
  const selectedGalleryItem =
    selectedGalleryIndex === null
      ? null
      : communityGalleryItems[selectedGalleryIndex]

  const openGallery = (galleryIndex: number, imageIndex: number) => {
    setSelectedGalleryIndex(galleryIndex)
    setSelectedImageIndex(imageIndex)
  }

  const closeGallery = () => {
    setSelectedGalleryIndex(null)
    setSelectedImageIndex(0)
  }

  const closeVideo = () => {
    setIsVideoOpen(false)
  }

  const goToNextStory = () => {
    setIsVideoOpen(false)
    setActiveStoryIndex((currentIndex) =>
      currentIndex === communityFeaturedStories.length - 1
        ? 0
        : currentIndex + 1,
    )
  }

  const goToPreviousStory = () => {
    setIsVideoOpen(false)
    setActiveStoryIndex((currentIndex) =>
      currentIndex === 0
        ? communityFeaturedStories.length - 1
        : currentIndex - 1,
    )
  }

  const openActiveStory = () => {
    setIsVideoOpen(true)
  }

  const goToNextLightboxImage = useCallback(() => {
    if (!selectedGalleryItem) return

    setSelectedImageIndex((currentIndex) =>
      currentIndex === selectedGalleryItem.images.length - 1
        ? 0
        : currentIndex + 1,
    )
  }, [selectedGalleryItem])

  const goToPreviousLightboxImage = useCallback(() => {
    if (!selectedGalleryItem) return

    setSelectedImageIndex((currentIndex) =>
      currentIndex === 0
        ? selectedGalleryItem.images.length - 1
        : currentIndex - 1,
    )
  }, [selectedGalleryItem])

  useEffect(() => {
    if (!selectedGalleryItem && !isVideoOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeGallery()
        closeVideo()
      }

      if (selectedGalleryItem && event.key === 'ArrowRight') {
        goToNextLightboxImage()
      }

      if (selectedGalleryItem && event.key === 'ArrowLeft') {
        goToPreviousLightboxImage()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    goToNextLightboxImage,
    goToPreviousLightboxImage,
    isVideoOpen,
    selectedGalleryItem,
  ])

  return (
    <section
      id="community"
      className="relative z-10 px-6 py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300">
                Community & Culture
              </p>

              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                Building Developers. Building Community.
              </h2>
            </div>

            <p className="max-w-md leading-7 text-white/55">
              Beyond programming and technology, APD is a community where
              students learn, collaborate, build meaningful projects, and create
              lasting experiences together.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/3 transition hover:border-yellow-300/40 hover:bg-yellow-400/10">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-72 overflow-hidden border-b border-white/10 bg-[#0b0d10] p-8 sm:p-10 lg:border-b-0 lg:border-r">
                <div className="absolute inset-0 opacity-40">
                  <div className="absolute -left-24 top-12 h-64 w-64 rounded-full bg-yellow-400/20 blur-3xl" />
                  <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
                </div>

                <div className="relative flex h-full min-h-56 flex-col items-center justify-center text-center">
                  <span className="inline-flex rounded-full border border-yellow-300/20 bg-yellow-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-200">
                    Organization Legacy
                  </span>

                  <div className="mt-8 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-black">
                    <img
                      src={apdLogo}
                      alt="APD Logo"
                      className="h-14 w-14 object-contain"
                    />
                  </div>

                  <h3 className="mt-8 text-3xl font-bold sm:text-4xl">
                    The People Behind APD
                  </h3>

                  <p className="mt-4 max-w-md leading-7 text-white/55">
                    A look back at the leaders who helped shape APD through a
                    year of service, innovation, and community.
                  </p>
                </div>
              </div>

              <div className="relative min-h-108 overflow-hidden bg-black sm:min-h-116 lg:min-h-72">
                <video
                  key={activeStory.videoSrc}
                  src={activeStory.videoSrc}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 hover:scale-105 hover:opacity-70"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/75 to-black/45" />
                <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/10 to-black/30" />

                <div className="relative flex h-full min-h-108 flex-col p-8 sm:min-h-116 sm:p-10 lg:min-h-72">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
                    {activeStory.eyebrow}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                    {activeStory.title}
                  </h3>

                  <p className="mt-4 max-w-md leading-7 text-white/70">
                    {activeStory.description}
                  </p>

                  <div className="mt-auto flex flex-col gap-5 pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={openActiveStory}
                      className="group inline-flex w-fit items-center gap-3 rounded-full border border-yellow-300/30 bg-yellow-400/10 px-5 py-3 text-sm font-semibold text-yellow-200 transition hover:border-yellow-300/60 hover:bg-yellow-400/20 hover:text-yellow-100"
                      aria-label={`Watch ${activeStory.title}`}
                    >
                      Watch Story
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-300 text-black">
                        <Play size={14} fill="currentColor" />
                      </span>
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={goToPreviousStory}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:border-yellow-300/40 hover:bg-yellow-400/10 hover:text-yellow-200"
                        aria-label="Previous featured story"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <div className="flex items-center gap-2">
                        {communityFeaturedStories.map((story, index) => (
                          <button
                            key={story.title}
                            type="button"
                            onClick={() => {
                              setIsVideoOpen(false)
                              setActiveStoryIndex(index)
                            }}
                            className={`h-2 rounded-full transition ${
                              index === activeStoryIndex
                                ? 'w-6 bg-yellow-300'
                                : 'w-2 bg-white/25 hover:bg-yellow-300/60'
                            }`}
                            aria-label={`Show ${story.title}`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={goToNextStory}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:border-yellow-300/40 hover:bg-yellow-400/10 hover:text-yellow-200"
                        aria-label="Next featured story"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {communityHighlights.map((highlight, index) => (
            <Reveal key={highlight.title} delay={0.15 + index * 0.08}>
              <div className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/3 p-7 transition hover:-translate-y-2 hover:border-yellow-300/40 hover:bg-yellow-400/10">
                <div className="mb-8 flex h-13 w-13 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-300">
                  <highlight.icon size={28} />
                </div>

                <h3 className="text-xl font-bold">{highlight.title}</h3>

                <p className="mt-3 flex-1 leading-7 text-white/60">
                  {highlight.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300">
                Community Highlights
              </p>

              <h3 className="text-2xl font-bold sm:text-3xl">
                Moments that shaped the APD community.
              </h3>
            </div>

            <p className="max-w-md leading-7 text-white/55">
              A growing collection of APD activities, events, and experiences
              that reflect the organization&apos;s culture of learning,
              collaboration, and student leadership.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {communityGalleryItems.map((item, index) => (
            <CommunityGalleryCard
              key={item.title}
              item={item}
              index={index}
              onOpen={(imageIndex) => openGallery(index, imageIndex)}
            />
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {communityValues.map((value, index) => (
            <Reveal key={value.title} delay={0.2 + index * 0.08}>
              <div className="flex h-full gap-5 rounded-3xl border border-white/10 bg-white/3 p-6 transition hover:-translate-y-1 hover:border-yellow-300/40 hover:bg-yellow-400/10">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-300">
                  <value.icon size={24} />
                </div>

                <div>
                  <h3 className="text-lg font-bold">{value.title}</h3>

                  <p className="mt-2 leading-7 text-white/55">
                    {value.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {selectedGalleryItem && (
        <CommunityGalleryLightbox
          item={selectedGalleryItem}
          activeImageIndex={selectedImageIndex}
          onClose={closeGallery}
          onNext={goToNextLightboxImage}
          onPrevious={goToPreviousLightboxImage}
          onSelectImage={setSelectedImageIndex}
        />
      )}

      {isVideoOpen && (
        <CommunityVideoModal
          eyebrow={activeStory.eyebrow}
          title={activeStory.title}
          videoSrc={activeStory.videoSrc}
          videoUrl={activeStory.videoUrl}
          onClose={closeVideo}
        />
      )}
    </section>
  )
}