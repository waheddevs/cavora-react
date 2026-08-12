import { Container, Typography } from "@mui/material"
import GoldButton from "../../components/ui/GoldButton"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import { useTourNavigation } from "app/hooks/CommonHooks/useTourNavigation"
import { useHomeContent } from "app/hooks/HomeHooks/useHomeContent"

export default function Explore() {
  /* HOOKS */
  const { openTour } = useTourNavigation()
  const { spotlight } = useHomeContent()

  /* HANDLERS */
  const handleExploreTour = () => {
    if (spotlight?.tour) openTour(spotlight.tour.id)
  }

  return (
    <section className="explore">
      <Container maxWidth={false} className="explore-content">
        <Typography className="explore-tagline">
          {spotlight?.tagline ?? "Hidden Gem"}
        </Typography>
        <Typography className="explore-title">
          {spotlight?.title ?? "Explore Ancient Kyoto"}
        </Typography>
        <Typography className="explore-subtitle">
          {spotlight?.subtitle ?? "Discover a remarkable journey."}
        </Typography>
        <GoldButton
          className="explore-btn"
          endIcon={<ArrowForwardRoundedIcon />}
          onClick={handleExploreTour}
          disabled={!spotlight?.tour}
        >
          Explore Now
        </GoldButton>
      </Container>
    </section>
  )
}
