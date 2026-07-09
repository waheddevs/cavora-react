import { Box, Container, Typography } from "@mui/material"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded"
import EmailRoundedIcon from "@mui/icons-material/EmailRounded"
import HeadsetMicRoundedIcon from "@mui/icons-material/HeadsetMicRounded"
import SupportScene from "./SupportScene"
import { contactInfo } from "../../../js/Contact"

const icons: Record<string, JSX.Element> = {
  location: <LocationOnRoundedIcon />,
  phone: <PhoneRoundedIcon />,
  email: <EmailRoundedIcon />,
}

export default function GetInTouch() {
  return (
    <section className="get-in-touch">
      <Container maxWidth={false} className="contact-container">
        <Box className="contact-grid">
          {/* Left: intro + info */}
          <Box className="contact-info">
            <Typography className="contact-tagline">Get in Touch</Typography>
            <Typography className="contact-title">
              We provide the most attractive and interesting tours
            </Typography>
            <Typography className="contact-text">
              Have questions about our tours, need a custom itinerary, or just
              want to say hello? Our travel experts are ready to help you plan
              the perfect journey. Reach out through any of the channels below
              and we'll get back to you within 24 hours.
            </Typography>

            <Box className="info-list">
              {contactInfo.map((item) => (
                <Box className="info-item" key={item.label}>
                  <div className="info-icon">{icons[item.icon]}</div>
                  <div className="info-body">
                    <span className="info-label">{item.label}</span>
                    <strong className="info-value">{item.value}</strong>
                  </div>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right: creative image */}
          <Box className="contact-media">
            <span className="media-blob" />
            <span className="media-dots" />
            <div className="media-frame">
              <SupportScene />
            </div>
            <Box className="media-badge">
              <div className="badge-ic">
                <HeadsetMicRoundedIcon />
              </div>
              <div className="badge-tx">
                <strong>24/7 Support</strong>
                <span>We reply within 24 hours</span>
              </div>
            </Box>
          </Box>
        </Box>
      </Container>
    </section>
  )
}
