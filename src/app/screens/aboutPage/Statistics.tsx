import { Box, Container, Typography } from "@mui/material"
import CountUp from "../../components/CountUp"
import { stats } from "app/data/aboutData"
import { useInViewOnce } from "app/hooks/CommonHooks/useInViewOnce"

export default function Statistics() {
  const { hasEntered: run, targetRef: sectionRef } =
    useInViewOnce<HTMLElement>(0.4)

  return (
    <section className="statistics" ref={sectionRef}>
      <Container maxWidth={false} className="stats-container">
        <Box className="stats-row">
          {stats.map(stat => (
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
