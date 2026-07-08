import { Box, Container, Typography } from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"

const team = [
  {
    img: "/img/about-us-img/team-daniel.jpg",
    name: "Daniel Reeves",
    role: "Founder & CEO",
  },
  {
    img: "/img/about-us-img/team-priya.jpg",
    name: "Priya Sharma",
    role: "Head of Operations",
  },
  {
    img: "/img/about-us-img/team-marco.jpg",
    name: "Marco Bellini",
    role: "Senior Tour Guide",
  },
  {
    img: "/img/about-us-img/team-aisha.jpg",
    name: "Aisha Okonkwo",
    role: "Client Experience",
  },
]

export default function Team() {
  return (
    <section className="team">
      <Container maxWidth={false} className="team-container">
        {/* Section header */}
        <Box className="team-head">
          <Typography className="section-tagline">Our People</Typography>
          <Typography className="section-title">Meet the Team</Typography>
          <Typography className="team-subtitle">
            The passionate people behind every extraordinary journey we create.
          </Typography>
        </Box>

        {/* Cards */}
        <Box className="team-grid">
          {team.map((member) => (
            <Box className="team-card" key={member.name}>
              <div className="team-avatar">
                <img src={member.img} alt={member.name} />
              </div>
              <Typography className="team-name">{member.name}</Typography>
              <Typography className="team-role">{member.role}</Typography>

              <Box className="team-socials">
                <button
                  type="button"
                  className="team-social"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </button>
                <button
                  type="button"
                  className="team-social"
                  aria-label="Twitter"
                >
                  <TwitterIcon />
                </button>
                <button
                  type="button"
                  className="team-social"
                  aria-label="Instagram"
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
