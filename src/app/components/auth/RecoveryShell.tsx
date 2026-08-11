import { ReactNode } from "react"
import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import "css/login.css"

interface RecoveryShellProps {
  title: string
  subtitle: string
  children: ReactNode
}

export default function RecoveryShell({
  title,
  subtitle,
  children,
}: RecoveryShellProps) {
  return (
    <Box className="login-page recovery-page">
      <Box className="auth-visual">
        <img
          src="/img/home-page-img/hero.jpg"
          className="visual-photo"
          alt=""
          aria-hidden="true"
        />
        <Link to="/" className="visual-logo" aria-label="Cavora home">
          <img src="/icons/logo.svg" alt="Cavora" />
        </Link>
        <Box className="visual-bottom">
          <Typography className="visual-title">Your journey is safe</Typography>
          <Typography className="visual-text">
            Secure your Cavora account and return to planning unforgettable
            adventures.
          </Typography>
        </Box>
        <span className="visual-credit">Swiss Alps, Zermatt</span>
      </Box>

      <Box className="auth-panel">
        <Box className="auth-card">
          <Link to="/" className="mobile-logo">
            <img src="/icons/logo.svg" alt="Cavora" />
          </Link>

          <Box className="auth-head">
            <Typography className="auth-title">{title}</Typography>
            <Typography className="auth-subtitle">{subtitle}</Typography>
          </Box>

          {children}
        </Box>
      </Box>
    </Box>
  )
}
