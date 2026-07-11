import { Container, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import GoldButton from "../../components/ui/GoldButton"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"

/* Featured hero tour — "Kyoto Temples & Bamboo Groves" in TourSingle.js */
const KYOTO_TOUR_ID = 18

export default function Explore() {
  const navigate = useNavigate()

  return (
    <section className="explore">
      <Container maxWidth={false} className="explore-content">
        <Typography className="explore-tagline">Hidden Gem</Typography>
        <Typography className="explore-title">
          Explore
          <br />
          Ancient Kyoto
        </Typography>
        <Typography className="explore-subtitle">
          Journey to the heart of old Japan. Discover hidden temples, serene
          bamboo groves, and centuries of timeless tradition.
        </Typography>
        <GoldButton
          className="explore-btn"
          endIcon={<ArrowForwardRoundedIcon />}
          onClick={() => navigate(`/tour-single?id=${KYOTO_TOUR_ID}`)}
        >
          Explore Now
        </GoldButton>
      </Container>
    </section>
  )
}
