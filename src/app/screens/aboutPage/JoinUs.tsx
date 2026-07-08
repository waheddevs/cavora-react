import { Box, Container, Typography } from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import YouTubeIcon from "@mui/icons-material/YouTube"
import TwitterIcon from "@mui/icons-material/Twitter"

const socials = [
  { icon: <FacebookIcon />, label: "Facebook" },
  { icon: <InstagramIcon />, label: "Instagram" },
  { icon: <YouTubeIcon />, label: "YouTube" },
  { icon: <TwitterIcon />, label: "Twitter" },
]

export default function JoinUs() {
  return (
    <section className="join-us">
      <Container maxWidth={false} className="join-content">
        <Typography className="join-tagline">Join Us</Typography>
        <Typography className="join-title">
          Accompany us to explore all
          <br />
          corners of the world
        </Typography>
        <Typography className="join-subtitle">
          Follow our adventures and be inspired for your next journey.
        </Typography>

        <Box className="join-socials">
          {socials.map((social) => (
            <button
              type="button"
              className="join-social"
              key={social.label}
              aria-label={social.label}
            >
              {social.icon}
              <span>{social.label}</span>
            </button>
          ))}
        </Box>
      </Container>
    </section>
  )
}
