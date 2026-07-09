import { Box, Container, Typography } from "@mui/material"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"

export default function Form() {
  return (
    <section className="contact-form-section">
      <Container maxWidth={false} className="contact-container">
        <Box className="form-head">
          <Typography className="section-tagline">Message</Typography>
          <Typography className="section-title">Send Us a Message</Typography>
          <Typography className="form-subtitle">
            Fill in the form below and our team will get back to you as soon as
            possible.
          </Typography>
        </Box>

        <Box
          component="form"
          className="contact-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-row">
            <div className="form-field">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" aria-label="Full name" />
            </div>
            <div className="form-field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                aria-label="Email address"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="(209) 555-0104"
                aria-label="Phone number"
              />
            </div>
            <div className="form-field">
              <label>Subject</label>
              <input
                type="text"
                placeholder="Tour enquiry"
                aria-label="Subject"
              />
            </div>
          </div>

          <div className="form-field">
            <label>Message</label>
            <textarea
              rows={6}
              placeholder="Tell us about your dream trip..."
              aria-label="Message"
            />
          </div>

          <button type="submit" className="form-submit">
            Send Message
            <ArrowForwardRoundedIcon />
          </button>
        </Box>
      </Container>
    </section>
  )
}
