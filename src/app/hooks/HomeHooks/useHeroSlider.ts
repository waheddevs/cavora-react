import { useEffect, useState } from "react"
export function useHeroSlider(slideCount: number, intervalMs = 5000) {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(previousSlide =>
        slideCount > 0 ? (previousSlide + 1) % slideCount : 0,
      )
    }, intervalMs)

    return () => clearInterval(timer)
  }, [intervalMs, slideCount])

  useEffect(() => {
    if (activeSlide >= slideCount) setActiveSlide(0)
  }, [activeSlide, slideCount])

  return { activeSlide, setActiveSlide }
}
