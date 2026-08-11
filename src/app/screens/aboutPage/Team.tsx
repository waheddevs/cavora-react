import { Box, Container, Typography } from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import { team } from "app/data/aboutData"
import { useSocialComingSoon } from "app/hooks/CommonHooks/useSocialComingSoon"

export default function Team() {
  /* DOMAIN HOOKS */
  const { handleSocialClick } = useSocialComingSoon()

  return (
    <section className="team">
      <Container maxWidth={false} className="team-container">
        <Box className="team-head">
          <Typography className="section-tagline">Our People</Typography>
          <Typography className="section-title">Meet the Team</Typography>
          <Typography className="team-subtitle">
            The passionate people behind every extraordinary journey we create.
          </Typography>
        </Box>

        <Box className="team-grid">
          {team.map(member => (
            <Box className="team-card" key={member.name}>
              <Box className="team-avatar">
                <img src={member.img} alt={member.name} />
              </Box>
              <Typography className="team-name">{member.name}</Typography>
              <Typography className="team-role">{member.role}</Typography>

              <Box className="team-socials">
                <button
                  type="button"
                  className="team-social"
                  aria-label="Facebook"
                  onClick={() => handleSocialClick("Facebook")}
                >
                  <FacebookIcon />
                </button>
                <button
                  type="button"
                  className="team-social"
                  aria-label="Twitter"
                  onClick={() => handleSocialClick("Twitter")}
                >
                  <TwitterIcon />
                </button>
                <button
                  type="button"
                  className="team-social"
                  aria-label="Instagram"
                  onClick={() => handleSocialClick("Instagram")}
                >
                  <InstagramIcon />
                </button>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </section>
  )
}
