import { useEffect, useRef, useState } from "react"

interface Props {
  end: number
  run: boolean
  duration?: number
}

/**
 * Counts from 0 up to `end` (ease-out) once `run` becomes true, then stops.
 * Renders only the number, so surrounding markup / styles stay intact.
 */
export default function CountUp({ end, run, duration = 1000 }: Props) {
  /* HOOKS */
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

  return <>{value}</>
}
