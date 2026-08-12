import { useNavigate } from "react-router-dom"
import { useAuth } from "app/hooks/AuthHooks/useAuth"
import {
  useAlerts,
  useNotifications,
} from "app/hooks/CommonHooks/useSweetAlert"

export function useConfirmedLogout() {
  const navigate = useNavigate()
  const { logout, logoutPending } = useAuth()
  const { confirmWithLoading } = useAlerts()
  const { notifyError } = useNotifications()

  const handleLogout = async () => {
    let logoutSucceeded = true
    const confirmed = await confirmWithLoading({
      title: "Log out of Cavora?",
      message:
        "Your current session will end, and you will need to sign in again.",
      confirmText: "Log out",
      cancelText: "Stay signed in",
      loadingMs: 600,
      onConfirm: async () => {
        try {
          await logout()
        } catch {
          logoutSucceeded = false
        }
      },
    })

    if (!confirmed) return
    if (logoutSucceeded) {
      navigate("/login")
      return
    }

    await notifyError({
      title: "Logout paused",
      message: "We could not securely end your session. Please try again.",
    })
  }

  return { handleLogout, logoutPending }
}
