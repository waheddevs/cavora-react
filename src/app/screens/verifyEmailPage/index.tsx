import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import RecoveryShell from "app/components/auth/RecoveryShell"
import { useVerifyEmail } from "app/hooks/AuthHooks/useVerifyEmail"

export default function VerifyEmailPage() {
  /* HOOKS */
  const { hasValidToken, isVerifying, isVerified, handleVerify } =
    useVerifyEmail()

  return (
    <RecoveryShell
      title="Verify your email"
      subtitle="Confirm your email address to finish securing your account."
    >
      <Box className="recovery-state">
        {!hasValidToken ? (
          <>
            <Typography className="recovery-state-text">
              This verification link is incomplete. Open the full link from your
              email.
            </Typography>
            <Link to="/login" className="auth-link">
              Back to login
            </Link>
          </>
        ) : isVerified ? (
          <>
            <Typography className="recovery-message" aria-live="polite">
              Your email is verified. Your account is ready to use.
            </Typography>
            <Link to="/login" className="auth-link">
              Continue to login
            </Link>
          </>
        ) : (
          <>
            <Typography className="recovery-state-text">
              Your secure verification link is ready.
            </Typography>
            <button
              type="button"
              className="auth-submit"
              onClick={handleVerify}
              disabled={isVerifying}
            >
              {isVerifying ? "Verifying email..." : "Verify email"}
            </button>
          </>
        )}
      </Box>
    </RecoveryShell>
  )
}
