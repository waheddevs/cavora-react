import { useEffect, useRef, useState } from "react"

export function useInViewOnce<T extends Element>(threshold = 0.4) {
  const [hasEntered, setHasEntered] = useState(false)
  const targetRef = useRef<T>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [threshold])

  return { hasEntered, targetRef }
}
