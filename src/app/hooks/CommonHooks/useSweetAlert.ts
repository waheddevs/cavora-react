import { useContext } from "react"
import {
  NotificationOptions,
  SweetAlertContext,
} from "app/contexts/sweetAlertContextValue"

function useSweetAlertContext() {
  const context = useContext(SweetAlertContext)

  if (!context) {
    throw new Error("SweetAlert hooks require SweetAlertProvider")
  }

  return context
}

export function useAlerts() {
  const { confirmWithLoading, showComingSoon } = useSweetAlertContext()
  return { confirmWithLoading, showComingSoon }
}

export function useNotifications() {
  const { notify } = useSweetAlertContext()

  return {
    notifySuccess: (options: NotificationOptions) => notify("success", options),
    notifyError: (options: NotificationOptions) => notify("error", options),
    notifyInfo: (options: NotificationOptions) => notify("info", options),
    notifyWarning: (options: NotificationOptions) => notify("warning", options),
  }
}
