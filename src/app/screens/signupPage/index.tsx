import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { useState } from "react"
import { validateSignup, type SignupErrors } from "ts/Signup"
import "css/signup.css"

export default function SignupPage() {
  /* HOOKS */
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<SignupErrors>({})

  /* HANDLER */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors = validateSignup({
      firstName,
      lastName,
      email,
      username,
      password,
    })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      /* Static — no backend yet. */
      console.log("Signup submitted", {
        firstName,
        lastName,
        email,
        username,
        password,
      })
    }
  }

  return (
    <Box className="signup-page">
      {/* Left: brand photo */}
      <Box className="auth-visual">
        <img
          src="/img/home-page-img/spotlight-machu-picchu.jpg"
          className="visual-photo"
          alt=""
          aria-hidden="true"
        />
        <Link to="/" className="visual-logo" aria-label="Cavora home">
          <img src="/icons/logo.svg" alt="Cavora" />
        </Link>
        <Box className="visual-bottom">
          <Typography className="visual-title">
            Your journey starts here
          </Typography>
          <Typography className="visual-text">
            Join Cavora and discover handpicked tours to the world's most
            breathtaking places.
          </Typography>
        </Box>
        <span className="visual-credit">Machu Picchu, Peru</span>
      </Box>

      {/* Right: form */}
      <Box className="auth-panel">
        <Box className="auth-card">
          <Link to="/" className="mobile-logo">
            <img src="/icons/logo.svg" alt="Cavora" />
          </Link>

          <Box className="auth-head">
            <Typography className="auth-title">Create Account</Typography>
            <Typography className="auth-subtitle">
              Join us and start exploring.
            </Typography>
          </Box>

          <Box
            component="form"
            className="auth-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <Box className="form-row">
              <Box className="form-field">
                <label htmlFor="signup-first">First name</label>
                <input
                  id="signup-first"
                  type="text"
                  className={errors.firstName ? "has-error" : ""}
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  aria-label="First name"
                />
                {errors.firstName && (
                  <span className="field-error">{errors.firstName}</span>
                )}
              </Box>
              <Box className="form-field">
                <label htmlFor="signup-last">Last name</label>
                <input
                  id="signup-last"
                  type="text"
                  className={errors.lastName ? "has-error" : ""}
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  aria-label="Last name"
                />
                {errors.lastName && (
                  <span className="field-error">{errors.lastName}</span>
                )}
              </Box>
            </Box>

            <Box className="form-field">
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                className={errors.email ? "has-error" : ""}
                value={email}
                onChange={e => setEmail(e.target.value)}
                aria-label="Email"
              />
              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </Box>

            <Box className="form-field">
              <Box className="field-head">
                <label htmlFor="signup-username">Username</label>
                <span className="field-hint">
                  letters, numbers and underscores
                </span>
              </Box>
              <input
                id="signup-username"
                type="text"
                className={errors.username ? "has-error" : ""}
                value={username}
                onChange={e => setUsername(e.target.value)}
                aria-label="Username"
              />
              {errors.username && (
                <span className="field-error">{errors.username}</span>
              )}
            </Box>

            <Box className="form-field">
              <Box className="field-head">
                <label htmlFor="signup-password">Password</label>
                <span className="field-hint">min. 8 char</span>
              </Box>
              <input
                id="signup-password"
                type="password"
                className={errors.password ? "has-error" : ""}
                value={password}
                onChange={e => setPassword(e.target.value)}
                aria-label="Password"
              />
              {errors.password && (
                <span className="field-error">{errors.password}</span>
              )}
            </Box>

            <button type="submit" className="auth-submit">
              Sign Up
            </button>
          </Box>

          <Box className="auth-switch">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
