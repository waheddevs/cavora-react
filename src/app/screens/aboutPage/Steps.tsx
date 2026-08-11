import { Box, Container, Typography } from "@mui/material"
import GoldButton from "../../components/ui/GoldButton"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import { steps } from "app/data/aboutData"
import { useTourNavigation } from "app/hooks/CommonHooks/useTourNavigation"

export default function Steps() {
  const { openTourList } = useTourNavigation()

  return (
    <section className="steps">
      <Container maxWidth={false} className="steps-container">
        <Box className="steps-grid">
          <Box className="steps-content">
            <Typography className="steps-tagline">How It Works</Typography>
            <Typography className="steps-title">
              3 Easy Steps
              <br />
              to Book Your Trip
            </Typography>

            <Box className="steps-list">
              {steps.map(step => (
                <Box className="step-item" key={step.number}>
                  <span className="step-number">{step.number}</span>
                  <Box className="step-body">
                    <Typography className="step-title">{step.title}</Typography>
                    <Typography className="step-text">{step.text}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <GoldButton
              className="steps-btn"
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={openTourList}
            >
              Start Planning
            </GoldButton>
          </Box>

          <Box className="steps-media">
            <img
              src="/img/about-us-img/about-steps.jpg"
              alt="Trip planning essentials"
              loading="lazy"
            />
          </Box>
        </Box>
      </Container>
    </section>
  )
}
