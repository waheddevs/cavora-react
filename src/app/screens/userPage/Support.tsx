import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import ForumRoundedIcon from "@mui/icons-material/ForumRounded"
import HelpRoundedIcon from "@mui/icons-material/HelpRounded"
import MailRoundedIcon from "@mui/icons-material/MailRounded"

const options = [
  {
    icon: <ForumRoundedIcon />,
    title: "Contact Support",
    text: "Reach our team for booking, payment or account help.",
    to: "/contact",
    cta: "Get in touch",
  },
  {
    icon: <HelpRoundedIcon />,
    title: "Help Center",
    text: "Browse answers about payments, safety and bookings.",
    to: "/faq",
    cta: "Visit FAQ",
  },
]

export default function Support() {
  return (
    <Box className="user-panel">
      <h2 className="user-panel-title">Support</h2>
      <p className="user-panel-subtitle">Need a hand? Here's how to reach us.</p>

      <Box className="support-grid">
        {options.map(o => (
          <Box className="support-card" key={o.title}>
            <Box className="support-icon">{o.icon}</Box>
            <Typography className="support-card-title">{o.title}</Typography>
            <Typography className="support-card-text">{o.text}</Typography>
            <NavLink to={o.to} className="support-link">
              {o.cta}
            </NavLink>
          </Box>
        ))}
      </Box>

      <Box className="support-contact">
        <MailRoundedIcon />
        <span>support@cavora.com</span>
      </Box>
    </Box>
  )
}
