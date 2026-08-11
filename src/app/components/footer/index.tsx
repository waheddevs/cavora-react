import { Box, Container, Divider, Stack, Typography } from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import YouTubeIcon from "@mui/icons-material/YouTube"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded"
import ApiRoundedIcon from "@mui/icons-material/ApiRounded"
import { NavLink } from "react-router-dom"
import { quickLinks, tourTypes, contactInfo } from "app/data/footerData"
import { useSystemEndpoints } from "app/hooks/CommonHooks/useSystemEndpoints"
import { useSocialComingSoon } from "app/hooks/CommonHooks/useSocialComingSoon"

const contactIcons: Record<string, JSX.Element> = {
  location: <LocationOnIcon className="contact-icon" />,
  phone: <PhoneIcon className="contact-icon" />,
  email: <EmailIcon className="contact-icon" />,
  time: <AccessTimeIcon className="contact-icon" />,
}

export default function Footer() {
  /* DOMAIN HOOKS */
  const { handleSocialClick } = useSocialComingSoon()
  const {
    health,
    isOperational,
    serviceStatus,
    isHealthChecking,
    isOpenApiLoading,
    handleCheckHealth,
    handleOpenApiDocs,
    handleDownloadOpenApi,
  } = useSystemEndpoints()

  return (
    <footer className="footer">
      <Container className="footer-container" maxWidth={false}>
        <Stack className="footer-grid">
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
                onClick={() => handleSocialClick("Facebook")}
              >
                <FacebookIcon />
              </button>
              <button
                type="button"
                aria-label="Twitter"
                className="social-link"
                onClick={() => handleSocialClick("Twitter")}
              >
                <TwitterIcon />
              </button>
              <button
                type="button"
                aria-label="Instagram"
                className="social-link"
                onClick={() => handleSocialClick("Instagram")}
              >
                <InstagramIcon />
              </button>
              <button
                type="button"
                aria-label="YouTube"
                className="social-link"
                onClick={() => handleSocialClick("YouTube")}
              >
                <YouTubeIcon />
              </button>
            </Stack>
          </Box>

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

          <Box className="footer-col">
            <Typography className="footer-col-title">Contact Us</Typography>
            <Divider className="footer-divider" />
            <ul className="footer-list contact-list">
              {contactInfo.map(item => (
                <li key={`${item.icon}-${item.text}`} className="contact-item">
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
          <Box className="footer-system-links">
            <button
              type="button"
              className={`footer-system-status${
                isOperational ? " is-operational" : ""
              }`}
              onClick={handleCheckHealth}
              disabled={isHealthChecking}
              title={
                health
                  ? `${health.service} · Database ${health.checks.database}`
                  : serviceStatus
              }
              aria-live="polite"
            >
              <i className={isHealthChecking ? "is-checking" : ""} />
              {serviceStatus}
            </button>
            <button type="button" onClick={handleOpenApiDocs}>
              <DescriptionRoundedIcon />
              API Docs
            </button>
            <button
              type="button"
              onClick={handleDownloadOpenApi}
              disabled={isOpenApiLoading}
            >
              <ApiRoundedIcon />
              {isOpenApiLoading ? "Preparing..." : "OpenAPI JSON"}
            </button>
          </Box>
        </Box>
      </Container>
    </footer>
  )
}
