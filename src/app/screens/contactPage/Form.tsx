import { Box, Container, Typography } from "@mui/material"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import { useContactForm } from "app/hooks/ContactHooks/useContactForm"

export default function Form() {
  /* HOOKS */
  const { values, isSubmitting, handleFieldChange, handleSubmit } =
    useContactForm()

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

        <Box component="form" className="contact-form" onSubmit={handleSubmit}>
          <Box className="form-row">
            <Box className="form-field">
              <label htmlFor="contact-full-name">Full Name</label>
              <input
                id="contact-full-name"
                type="text"
                placeholder="John Doe"
                aria-label="Full name"
                value={values.fullName}
                onChange={handleFieldChange("fullName")}
                maxLength={160}
                required
              />
            </Box>
            <Box className="form-field">
              <label htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                type="email"
                placeholder="john@example.com"
                aria-label="Email address"
                value={values.email}
                onChange={handleFieldChange("email")}
                maxLength={254}
                required
              />
            </Box>
          </Box>

          <Box className="form-row">
            <Box className="form-field">
              <label htmlFor="contact-phone">Phone Number</label>
              <input
                id="contact-phone"
                type="tel"
                placeholder="(209) 555-0104"
                aria-label="Phone number"
                value={values.phone}
                onChange={handleFieldChange("phone")}
                maxLength={30}
              />
            </Box>
            <Box className="form-field">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                placeholder="Tour enquiry"
                aria-label="Subject"
                value={values.subject}
                onChange={handleFieldChange("subject")}
                minLength={2}
                maxLength={240}
                required
              />
            </Box>
          </Box>

          <Box className="form-field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              rows={6}
              placeholder="Tell us about your dream trip..."
              aria-label="Message"
              value={values.message}
              onChange={handleFieldChange("message")}
              minLength={10}
              maxLength={10000}
              required
            />
          </Box>

          <button type="submit" className="form-submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
            <ArrowForwardRoundedIcon />
          </button>
        </Box>
      </Container>
    </section>
  )
}
