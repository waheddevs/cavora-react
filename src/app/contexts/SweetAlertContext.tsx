import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react"
import { createRoot, Root } from "react-dom/client"
import { Box, CircularProgress } from "@mui/material"
import Swal, { SweetAlertIcon } from "sweetalert2"
import "css/sweetAlert.css"

const BRAND_GOLD = "#FFB300"

interface ConfirmWithLoadingOptions {
  message: string
  confirmText?: string
  cancelText?: string
  loadingMs?: number
  onConfirm?: () => void | Promise<void>
}

interface NotificationOptions {
  title: string
  message?: string
}

interface SweetAlertContextValue {
  confirmWithLoading: (options: ConfirmWithLoadingOptions) => Promise<boolean>
  notify: (icon: SweetAlertIcon, options: NotificationOptions) => Promise<void>
}

const SweetAlertContext = createContext<SweetAlertContextValue | null>(null)

const wait = (milliseconds: number) =>
  new Promise(resolve => window.setTimeout(resolve, milliseconds))

export function SweetAlertProvider({ children }: { children: ReactNode }) {
  /* ALERT HANDLERS */
  const confirmWithLoading = useCallback(
    async ({
      message,
      confirmText = "Yes",
      cancelText = "No",
      loadingMs = 3000,
      onConfirm,
    }: ConfirmWithLoadingOptions) => {
      let loaderRoot: Root | null = null

      const result = await Swal.fire({
        icon: "question",
        iconColor: BRAND_GOLD,
        text: message,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        buttonsStyling: false,
        customClass: {
          container: "cavora-swal-container",
          popup: "cavora-swal-popup",
          icon: "cavora-swal-icon",
          htmlContainer: "cavora-swal-message",
          actions: "cavora-swal-actions",
          confirmButton: "cavora-swal-confirm",
          cancelButton: "cavora-swal-cancel",
        },
        preConfirm: async () => {
          const popup = Swal.getPopup()
          const icon = Swal.getIcon()
          const messageContainer = Swal.getHtmlContainer()
          const actions = Swal.getActions()

          popup?.classList.add("is-loading")
          icon?.remove()
          actions?.remove()

          if (messageContainer) {
            messageContainer.replaceChildren()
            loaderRoot = createRoot(messageContainer)
            loaderRoot.render(
              <Box
                className="cavora-swal-loader"
                aria-label="Processing payment"
              >
                <CircularProgress
                  size={54}
                  thickness={4.2}
                  sx={{ color: BRAND_GOLD }}
                />
              </Box>,
            )
          }

          await Promise.all([wait(loadingMs), onConfirm?.()])
          return true
        },
        willClose: () => {
          loaderRoot?.unmount()
          loaderRoot = null
        },
      })

      return result.isConfirmed
    },
    [],
  )

  /* NOTIFICATION HANDLERS */
  const notify = useCallback(
    async (icon: SweetAlertIcon, { title, message }: NotificationOptions) => {
      await Swal.fire({
        icon,
        iconColor: icon === "error" ? "#E5484D" : BRAND_GOLD,
        title,
        text: message,
        timer: 2600,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
        customClass: {
          container: "cavora-toast-container",
          popup: "cavora-toast-popup",
          timerProgressBar: "cavora-toast-progress",
        },
      })
    },
    [],
  )

  const value = useMemo(
    () => ({ confirmWithLoading, notify }),
    [confirmWithLoading, notify],
  )

  return (
    <SweetAlertContext.Provider value={value}>
      {children}
    </SweetAlertContext.Provider>
  )
}

function useSweetAlertContext() {
  const context = useContext(SweetAlertContext)

  if (!context) {
    throw new Error("SweetAlert hooks require SweetAlertProvider")
  }

  return context
}

export function useAlerts() {
  const { confirmWithLoading } = useSweetAlertContext()
  return { confirmWithLoading }
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
