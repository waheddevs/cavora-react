import { Box, Container, Typography } from "@mui/material"
import GoldButton from "../../components/ui/GoldButton"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"

const features = [
  "Certified & trusted travel agency",
  "Fully personalised itineraries",
  "24/7 dedicated customer support",
  "Best price guarantee",
]

export default function OurStory() {
  return (
    <section className="our-story">
      <Container maxWidth={false} className="story-container">
        <Box className="story-grid">
          {/* Left: text */}
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
              {features.map((f) => (
                <Box className="story-feature" key={f}>
                  <CheckCircleRoundedIcon className="feature-check" />
                  <span>{f}</span>
                </Box>
              ))}
            </Box>

            <GoldButton
              className="story-btn"
              endIcon={<ArrowForwardRoundedIcon />}
            >
              Explore Tours
            </GoldButton>
          </Box>

          {/* Right: image + badge */}
          <Box className="story-media">
            <Box className="story-inner">
              <div className="story-ring" />
              <div className="story-image">
                <img
                  src="/img/about-us-img/about-intro.jpg"
                  alt="Travellers hiking in the mountains"
                />
              </div>
              <Box className="story-badge">
                <div className="badge-icon">
                  <WorkspacePremiumRoundedIcon />
                </div>
                <div className="badge-text">
                  <strong>Award Winning</strong>
                  <span>Travel Agency</span>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </section>
  )
}
