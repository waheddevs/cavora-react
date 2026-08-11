import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import RecoveryShell from "app/components/auth/RecoveryShell"
import { useResetPassword } from "app/hooks/AuthHooks/useResetPassword"

export default function ResetPasswordPage() {
  /* HOOKS */
  const { form, hasValidToken, isSubmitting, handleFieldChange, handleSubmit } =
    useResetPassword()

  return (
    <RecoveryShell
      title="Create a new password"
      subtitle="Choose a strong password to secure your Cavora account."
    >
      {!hasValidToken ? (
        <Box className="recovery-state">
          <Typography className="recovery-state-text">
            This reset link is incomplete. Request a fresh link to continue.
          </Typography>
          <Link to="/forgot-password" className="auth-link">
            Request a new reset link
          </Link>
        </Box>
      ) : (
        <>
          <Box component="form" className="auth-form" onSubmit={handleSubmit}>
            <Box className="form-field">
              <label htmlFor="reset-password">New password</label>
              <input
                id="reset-password"
                type="password"
                value={form.password}
                onChange={handleFieldChange("password")}
                autoComplete="new-password"
                minLength={8}
                maxLength={128}
                required
              />
            </Box>

            <Box className="form-field">
              <label htmlFor="reset-confirm-password">Confirm password</label>
              <input
                id="reset-confirm-password"
                type="password"
                value={form.confirmPassword}
                onChange={handleFieldChange("confirmPassword")}
                autoComplete="new-password"
                minLength={8}
                maxLength={128}
                required
              />
            </Box>

            <button
              type="submit"
              className="auth-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating password..." : "Reset password"}
            </button>
          </Box>

          <Box className="auth-switch">
            <Link to="/login" className="auth-link">
              Back to login
            </Link>
          </Box>
        </>
      )}
    </RecoveryShell>
  )
}
