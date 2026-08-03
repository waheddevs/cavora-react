import { useEffect, useRef, useState } from "react"
import { Box, Container, Typography } from "@mui/material"
import CountUp from "../../components/CountUp"
import { stats } from "ts/About"

export default function Statistics() {
  /* HOOKS */
  const [run, setRun] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="statistics" ref={sectionRef}>
      <Container maxWidth={false} className="stats-container">
        <Box className="stats-row">
          {stats.map((stat) => (
            <Box className="stat-item" key={stat.label}>
              <Typography className="stat-value">
                <CountUp end={Number(stat.value)} run={run} />
                <span>{stat.suffix}</span>
              </Typography>
              <Typography className="stat-label">{stat.label}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </section>
  )
}
