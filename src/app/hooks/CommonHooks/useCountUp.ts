import { useEffect, useRef, useState } from "react"

export function useCountUp(end: number, run: boolean, duration = 1000): number {
  const [value, setValue] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    if (!run || done.current) return
    done.current = true

    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(end * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [run, end, duration])

  return value
}
