import { Box, Container, Typography } from "@mui/material"

interface Stat {
  value: string
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: "356", suffix: "+", label: "Happy Clients" },
  { value: "26", suffix: "+", label: "Destinations" },
  { value: "100", suffix: "%", label: "Satisfaction Rate" },
  { value: "12", suffix: "+", label: "Years Experience" },
]

export default function Statistics() {
  return (
    <section className="statistics">
      <Container maxWidth={false} className="stats-container">
        <Box className="stats-row">
          {stats.map((stat) => (
            <Box className="stat-item" key={stat.label}>
              <Typography className="stat-value">
                {stat.value}
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
