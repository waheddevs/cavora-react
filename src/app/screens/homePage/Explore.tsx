import { Container, Typography } from "@mui/material"
import GoldButton from "../../components/ui/GoldButton"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"

export default function Explore() {
  return (
    <section className="explore">
      <Container maxWidth={false} className="explore-content">
        <Typography className="explore-tagline">Hidden Gem</Typography>
        <Typography className="explore-title">
          Explore
          <br />
          Machu Picchu
        </Typography>
        <Typography className="explore-subtitle">
          Journey to the heart of the ancient Inca Empire. Discover hidden
          trails, breathtaking mountain views, and a civilization lost in time.
        </Typography>
        <GoldButton className="explore-btn" endIcon={<ArrowForwardRoundedIcon />}>
          Explore Now
        </GoldButton>
      </Container>
    </section>
  )
}
