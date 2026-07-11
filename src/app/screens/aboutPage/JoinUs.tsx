import { Box, Container, Typography } from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import YouTubeIcon from "@mui/icons-material/YouTube"
import TwitterIcon from "@mui/icons-material/Twitter"
import { joinSocials } from "js/About"

const icons: Record<string, JSX.Element> = {
  Facebook: <FacebookIcon />,
  Instagram: <InstagramIcon />,
  YouTube: <YouTubeIcon />,
  Twitter: <TwitterIcon />,
}

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
          {joinSocials.map((label) => (
            <button
              type="button"
              className="join-social"
              key={label}
              aria-label={label}
            >
              {icons[label]}
              <span>{label}</span>
            </button>
          ))}
        </Box>
      </Container>
    </section>
  )
}
