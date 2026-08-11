import { useEffect, useState } from "react"

export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let animationFrame = 0
    const updateScrollState = () => {
      animationFrame = 0
      setScrolled(current => {
        const next = window.scrollY > threshold
        return current === next ? current : next
      })
    }
    const handleScroll = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateScrollState)
      }
    }

    updateScrollState()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [threshold])

  return scrolled
}
