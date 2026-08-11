import { useCallback } from "react"
import { useAlerts } from "app/contexts/SweetAlertContext"

export function useSocialComingSoon() {
  /* ALERT HOOKS */
  const { showComingSoon } = useAlerts()

  /* HANDLERS */
  const handleSocialClick = useCallback(
    (platform: string) => {
      void showComingSoon(platform)
    },
    [showComingSoon],
  )

  return { handleSocialClick }
}
