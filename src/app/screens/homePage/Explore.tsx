import { Container, Typography } from "@mui/material"
import GoldButton from "../../components/ui/GoldButton"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import { useTourNavigation } from "app/hooks/CommonHooks/useTourNavigation"

const KYOTO_TOUR_ID = 18

export default function Explore() {
  const { openTour } = useTourNavigation()

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
          onClick={() => openTour(KYOTO_TOUR_ID)}
        >
          Explore Now
        </GoldButton>
      </Container>
    </section>
  )
}
