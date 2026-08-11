import { Box, Container, Typography } from "@mui/material"
import GoldButton from "../../components/ui/GoldButton"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import { storyFeatures as features } from "app/data/aboutData"
import { useTourNavigation } from "app/hooks/CommonHooks/useTourNavigation"

export default function OurStory() {
  const { openTourList } = useTourNavigation()

  return (
    <section className="our-story">
      <Container maxWidth={false} className="story-container">
        <Box className="story-grid">
          <Box className="story-content">
            <Typography className="story-tagline">Our Story</Typography>
            <Typography className="story-title">
              Your perfect partner for unforgettable travel experiences
            </Typography>
            <Typography className="story-text">
              Born from a passion for exploration, Cavora has been connecting
              adventurous souls with extraordinary destinations for over a
              decade. We believe every journey should be as remarkable as the
              destination itself.
            </Typography>
            <Typography className="story-text">
              From the snow-capped peaks of Japan to the sun-drenched shores of
              the Maldives, we craft personalised itineraries that turn travel
              dreams into lifelong memories.
            </Typography>

            <Box className="story-features">
              {features.map(feature => (
                <Box className="story-feature" key={feature}>
                  <CheckCircleRoundedIcon className="feature-check" />
                  <span>{feature}</span>
                </Box>
              ))}
            </Box>

            <GoldButton
              className="story-btn"
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={openTourList}
            >
              Explore Tours
            </GoldButton>
          </Box>

          <Box className="story-media">
            <Box className="story-inner">
              <Box className="story-ring" />
              <Box className="story-image">
                <img
                  src="/img/about-us-img/about-intro.webp"
                  alt="Travellers hiking in the mountains"
                  loading="lazy"
                />
              </Box>
              <Box className="story-badge">
                <Box className="badge-icon">
                  <WorkspacePremiumRoundedIcon />
                </Box>
                <Box className="badge-text">
                  <strong>Award Winning</strong>
                  <span>Travel Agency</span>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </section>
  )
}
