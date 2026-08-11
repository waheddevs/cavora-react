import { useSearchParams } from "react-router-dom"
import { useVerifyEmailMutation } from "app/api/authApi"
import { getApiErrorMessage } from "app/api/apiErrors"
import { useNotifications } from "app/contexts/SweetAlertContext"

export function useVerifyEmail() {
  /* ROUTER HOOKS */
  const [searchParams] = useSearchParams()

  /* API HOOKS */
  const [verifyEmail, verifyState] = useVerifyEmailMutation()

  /* DOMAIN HOOKS */
  const { notifyError, notifySuccess } = useNotifications()

  /* DERIVED DATA */
  const token = searchParams.get("token") ?? ""
  const hasValidToken = token.length >= 40

  /* HANDLERS */
  const handleVerify = async () => {
    if (!hasValidToken) return

    try {
      const result = await verifyEmail({ token }).unwrap()
      await notifySuccess({
        title: "Email verified",
        message: result.message,
      })
    } catch (error) {
      await notifyError({
        title: "Verification link unavailable",
        message: getApiErrorMessage(
          error,
          "This verification link may have expired or already been used.",
        ),
      })
    }
  }

  return {
    hasValidToken,
    isVerifying: verifyState.isLoading,
    isVerified: verifyState.isSuccess,
    handleVerify,
  }
}
