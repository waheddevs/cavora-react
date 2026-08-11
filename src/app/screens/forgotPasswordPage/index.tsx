import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import RecoveryShell from "app/components/auth/RecoveryShell"
import { useForgotPassword } from "app/hooks/AuthHooks/useForgotPassword"

export default function ForgotPasswordPage() {
  /* HOOKS */
  const {
    email,
    resultMessage,
    isSubmitting,
    handleEmailChange,
    handleSubmit,
  } = useForgotPassword()

  return (
    <RecoveryShell
      title="Forgot password?"
      subtitle="Enter your email and we’ll prepare a secure reset link."
    >
      <Box component="form" className="auth-form" onSubmit={handleSubmit}>
        <Box className="form-field">
          <label htmlFor="recovery-email">Email</label>
          <input
            id="recovery-email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            autoComplete="email"
            maxLength={254}
            required
          />
        </Box>

        {resultMessage && (
          <Typography className="recovery-message" aria-live="polite">
            {resultMessage}
          </Typography>
        )}

        <button type="submit" className="auth-submit" disabled={isSubmitting}>
          {isSubmitting ? "Preparing link..." : "Send reset link"}
        </button>
      </Box>

      <Box className="auth-switch">
        Remembered your password?{" "}
        <Link to="/login" className="auth-link">
          Back to login
        </Link>
      </Box>
    </RecoveryShell>
  )
}
