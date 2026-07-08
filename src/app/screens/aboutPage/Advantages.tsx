import { Box, Container, Typography } from "@mui/material"
import RouteRoundedIcon from "@mui/icons-material/RouteRounded"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import MapRoundedIcon from "@mui/icons-material/MapRounded"

const advantages = [
  {
    icon: <RouteRoundedIcon />,
    title: "Best Tours",
    text: "Carefully crafted itineraries that balance adventure, culture, and relaxation for the perfect travel experience.",
  },
  {
    icon: <StarRoundedIcon />,
    title: "Best Experience",
    text: "Over a decade of delivering world-class travel experiences with a dedicated team of passionate travel experts.",
  },
  {
    icon: <MapRoundedIcon />,
    title: "Travel Guide",
    text: "Expert local guides who bring destinations to life with insider knowledge, hidden gems, and authentic stories.",
  },
]

export default function Advantages() {
  return (
    <section className="advantages">
      <Container maxWidth={false} className="adv-container">
        {/* Section header */}
        <Box className="adv-head">
          <Typography className="section-tagline">Our Advantages</Typography>
          <Typography className="section-title">Why Choose Cavora?</Typography>
          <Typography className="adv-subtitle">
            We are committed to making every journey extraordinary through
            exceptional service, expert knowledge, and genuine care.
          </Typography>
        </Box>

        {/* Cards */}
        <Box className="adv-grid">
          {advantages.map((adv) => (
            <Box className="adv-card" key={adv.title}>
              <div className="adv-icon">{adv.icon}</div>
              <Typography className="adv-card-title">{adv.title}</Typography>
              <Typography className="adv-card-text">{adv.text}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </section>
  )
}
