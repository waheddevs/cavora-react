import { useCallback } from "react"
import { useAlerts } from "app/hooks/CommonHooks/useSweetAlert"

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
