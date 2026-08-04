import { Box, Container, Typography } from "@mui/material"
import GoldButton from "../../components/ui/GoldButton"
import SendRoundedIcon from "@mui/icons-material/SendRounded"

export default function Subscribe() {
  return (
    <section className="subscribe">
      <Container maxWidth={false} className="subscribe-content">
        <Typography className="subscribe-tagline">Stay Updated</Typography>
        <Typography className="subscribe-title">
          Get Exclusive Travel Deals
        </Typography>
        <Typography className="subscribe-subtitle">
          Subscribe to our newsletter and be the first to know about special
          offers, new destinations, and travel tips.
        </Typography>

        <Box
          component="form"
          className="subscribe-form"
          onSubmit={e => e.preventDefault()}
        >
          <input
            type="email"
            className="subscribe-input"
            placeholder="Enter your email address"
            aria-label="Email address"
            required
          />
          <GoldButton
            type="submit"
            className="subscribe-btn"
            endIcon={<SendRoundedIcon />}
          >
            Subscribe
          </GoldButton>
        </Box>
      </Container>
    </section>
  )
}
