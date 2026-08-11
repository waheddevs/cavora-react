import {
  KeyboardEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { GalleryImage } from "app/types/home"
import { useTourNavigation } from "app/hooks/CommonHooks/useTourNavigation"

const SWIPE_DISTANCE = 50

export function useTravelGallery(images: GalleryImage[]) {
  /* STATE */
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const galleryRef = useRef<HTMLElement | null>(null)

  /* DOMAIN HOOKS */
  const { openTour } = useTourNavigation()

  /* DERIVED DATA */
  const activeImage =
    activeIndex === null ? null : (images[activeIndex] ?? null)

  /* HANDLERS */
  const openImage = useCallback((index: number) => setActiveIndex(index), [])
  const closeImage = useCallback(() => setActiveIndex(null), [])
  const showPrevious = useCallback(() => {
    if (!images.length) return
    setActiveIndex(currentIndex =>
      currentIndex === null
        ? 0
        : (currentIndex - 1 + images.length) % images.length,
    )
  }, [images.length])
  const showNext = useCallback(() => {
    if (!images.length) return
    setActiveIndex(currentIndex =>
      currentIndex === null ? 0 : (currentIndex + 1) % images.length,
    )
  }, [images.length])
  const handleTileKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    index: number,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      openImage(index)
    }
  }
  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }
  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return
    const touchEndX = event.changedTouches[0]?.clientX
    if (touchEndX === undefined) return

    const distance = touchEndX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(distance) < SWIPE_DISTANCE) return
    if (distance > 0) showPrevious()
    else showNext()
  }
  const exploreTour = (tourId: number) => {
    closeImage()
    openTour(tourId)
  }

  /* EFFECTS */
  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery || typeof IntersectionObserver === "undefined") {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.16 },
    )
    observer.observe(gallery)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (activeIndex === null) return

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "ArrowLeft") showPrevious()
      if (event.key === "ArrowRight") showNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeIndex, showNext, showPrevious])

  return {
    activeImage,
    activeIndex,
    closeImage,
    exploreTour,
    galleryRef,
    handleTileKeyDown,
    handleTouchEnd,
    handleTouchStart,
    isVisible,
    openImage,
    showNext,
    showPrevious,
  }
}
