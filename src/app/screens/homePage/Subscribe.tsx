import { Box, Container, Typography } from "@mui/material"
import GoldButton from "../../components/ui/GoldButton"
import SendRoundedIcon from "@mui/icons-material/SendRounded"
import { useNewsletterSubscription } from "app/hooks/CommonHooks/useNewsletterSubscription"

export default function Subscribe() {
  /* HOOKS */
  const { email, isSubmitting, handleEmailChange, handleSubmit } =
    useNewsletterSubscription("HOMEPAGE")

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
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            className="subscribe-input"
            placeholder="Enter your email address"
            aria-label="Email address"
            value={email}
            onChange={handleEmailChange}
            disabled={isSubmitting}
            required
          />
          <GoldButton
            type="submit"
            className="subscribe-btn"
            endIcon={<SendRoundedIcon />}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </GoldButton>
        </Box>
      </Container>
    </section>
  )
}
