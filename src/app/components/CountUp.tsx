import { useCountUp } from "app/hooks/CommonHooks/useCountUp"

interface Props {
  end: number
  run: boolean
  duration?: number
}

export default function CountUp({ end, run, duration = 1000 }: Props) {
  const value = useCountUp(end, run, duration)

  return <>{value}</>
}
