import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { useLoginForm } from "app/hooks/LoginHooks/useLoginForm"
import "css/login.css"

export default function LoginPage() {
  /* HOOKS */
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    errors,
    submitError,
    isSubmitting,
    handleSubmit,
  } = useLoginForm()

  return (
    <Box className="login-page">
      <Box className="auth-visual">
        <img
          src="/img/home-page-img/hero.webp"
          className="visual-photo"
          alt=""
          aria-hidden="true"
        />
        <Link to="/" className="visual-logo" aria-label="Cavora home">
          <img src="/icons/logo.svg" alt="Cavora" />
        </Link>
        <Box className="visual-bottom">
          <Typography className="visual-title">
            Welcome back, explorer
          </Typography>
          <Typography className="visual-text">
            Sign in to continue planning your next adventure and pick up right
            where you left off.
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
            <Typography className="auth-title">Login</Typography>
            <Typography className="auth-subtitle">Welcome back.</Typography>
          </Box>

          <Box
            component="form"
            className="auth-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <Box className="form-field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                className={errors.email ? "has-error" : ""}
                value={email}
                onChange={handleEmailChange}
                aria-label="Email"
              />
              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </Box>

            <Box className="form-field">
              <Box className="field-head">
                <label htmlFor="login-password">Password</label>
                <Link to="/forgot-password" className="auth-link">
                  Forgot your password?
                </Link>
              </Box>
              <input
                id="login-password"
                type="password"
                className={errors.password ? "has-error" : ""}
                value={password}
                onChange={handlePasswordChange}
                aria-label="Password"
              />
              {errors.password && (
                <span className="field-error">{errors.password}</span>
              )}
            </Box>

            {submitError && <span className="field-error">{submitError}</span>}
            <button
              type="submit"
              className="auth-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </button>
          </Box>

          <Box className="auth-switch">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Sign Up
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
