import { Box, Container, Typography } from "@mui/material"
import GoldButton from "../../components/ui/GoldButton"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"

const steps = [
  {
    number: "01",
    title: "Find Your Destination",
    text: "Browse our extensive collection of tours and destinations. Filter by type, duration, or budget to find your perfect trip.",
  },
  {
    number: "02",
    title: "Book & Customise",
    text: "Select your dates, group size and any add-ons. Our team will tailor the itinerary to match your preferences.",
  },
  {
    number: "03",
    title: "Enjoy Your Journey",
    text: "Pack your bags and go! We handle everything from transfers to accommodation so you can focus on the experience.",
  },
]

export default function Steps() {
  return (
    <section className="steps">
      <Container maxWidth={false} className="steps-container">
        <Box className="steps-grid">
          {/* Left: text + steps */}
          <Box className="steps-content">
            <Typography className="steps-tagline">How It Works</Typography>
            <Typography className="steps-title">
              3 Easy Steps
              <br />
              to Book Your Trip
            </Typography>

            <Box className="steps-list">
              {steps.map((step) => (
                <Box className="step-item" key={step.number}>
                  <span className="step-number">{step.number}</span>
                  <div className="step-body">
                    <Typography className="step-title">{step.title}</Typography>
                    <Typography className="step-text">{step.text}</Typography>
                  </div>
                </Box>
              ))}
            </Box>

            <GoldButton
              className="steps-btn"
              endIcon={<ArrowForwardRoundedIcon />}
            >
              Start Planning
            </GoldButton>
          </Box>

          {/* Right: image */}
          <Box className="steps-media">
            <img
              src="/img/about-us-img/about-steps.jpg"
              alt="Trip planning essentials"
            />
          </Box>
        </Box>
      </Container>
    </section>
  )
}
