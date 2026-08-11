import { useCallback, useEffect, useState } from "react"

interface SliderState {
  current: number
  /* -1 until the first transition, so the very first render has no outgoing
     slide to keep mounted. */
  previous: number
}

export function useHeroSlider(slideCount: number, intervalMs = 5000) {
  const [slide, setSlide] = useState<SliderState>({ current: 0, previous: -1 })

  useEffect(() => {
    if (slideCount === 0) return

    const timer = setInterval(() => {
      setSlide(({ current }) => ({
        current: (current + 1) % slideCount,
        previous: current,
      }))
    }, intervalMs)

    return () => clearInterval(timer)
  }, [intervalMs, slideCount])

  const setActiveSlide = useCallback(
    (next: number) =>
      setSlide(({ current }) => ({ current: next, previous: current })),
    [],
  )

  /* Derived rather than corrected inside an effect: if the slide list shrinks,
     the fallback applies on the same render instead of one render later. */
  const activeSlide = slide.current < slideCount ? slide.current : 0
  const previousSlide = slide.previous < slideCount ? slide.previous : -1

  return { activeSlide, previousSlide, setActiveSlide }
}
