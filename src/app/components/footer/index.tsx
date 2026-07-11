import { Box, Container, Divider, Stack, Typography } from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import YouTubeIcon from "@mui/icons-material/YouTube"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { NavLink } from "react-router-dom"
import { quickLinks, tourTypes, contactInfo } from "ts/Footer"

/* Map contactInfo icon keys (from Footer.ts) to MUI icon components */
const contactIcons: Record<string, JSX.Element> = {
  location: <LocationOnIcon className="contact-icon" />,
  phone: <PhoneIcon className="contact-icon" />,
  email: <EmailIcon className="contact-icon" />,
  time: <AccessTimeIcon className="contact-icon" />,
}

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="footer-container" maxWidth={false}>
        <Stack className="footer-grid">
          {/* Brand Column */}
          <Box className="footer-brand">
            <NavLink to="/">
              <img
                src="/icons/logo.svg"
                alt="cavora logo"
                className="footer-logo"
              />
            </NavLink>
            <Typography className="footer-desc">
              Your trusted partner for extraordinary travel experiences around
              the globe. Adventure awaits at every destination.
            </Typography>
            <Stack className="footer-socials">
              <button
                type="button"
                aria-label="Facebook"
                className="social-link"
              >
                <FacebookIcon />
              </button>
              <button
                type="button"
                aria-label="Twitter"
                className="social-link"
              >
                <TwitterIcon />
              </button>
              <button
                type="button"
                aria-label="Instagram"
                className="social-link"
              >
                <InstagramIcon />
              </button>
              <button
                type="button"
                aria-label="YouTube"
                className="social-link"
              >
                <YouTubeIcon />
              </button>
            </Stack>
          </Box>

          {/* Quick Links */}
          <Box className="footer-col">
            <Typography className="footer-col-title">Quick Links</Typography>
            <Divider className="footer-divider" />
            <ul className="footer-list">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <NavLink to={link.path} className="footer-link">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Box>

          {/* Tour Types */}
          <Box className="footer-col">
            <Typography className="footer-col-title">Tour Types</Typography>
            <Divider className="footer-divider" />
            <ul className="footer-list">
              {tourTypes.map(item => (
                <li key={item.type}>
                  <NavLink
                    to={`/tour?type=${item.type}`}
                    className="footer-link"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Box>

          {/* Contact Us */}
          <Box className="footer-col">
            <Typography className="footer-col-title">Contact Us</Typography>
            <Divider className="footer-divider" />
            <ul className="footer-list contact-list">
              {contactInfo.map((item, idx) => (
                <li key={idx} className="contact-item">
                  {contactIcons[item.icon]}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </Box>
        </Stack>

        <Divider className="footer-bottom-divider" />
        <Box className="footer-bottom">
          <Typography className="footer-copy">
            © {new Date().getFullYear()} Cavora. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </footer>
  )
}
