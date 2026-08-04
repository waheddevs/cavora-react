import { useEffect, useState } from "react"
import { heroSlides } from "app/data/homeData"

export function useHeroSlider(intervalMs = 5000) {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(previousSlide => (previousSlide + 1) % heroSlides.length)
    }, intervalMs)

    return () => clearInterval(timer)
  }, [intervalMs])

  return { activeSlide, setActiveSlide }
}
