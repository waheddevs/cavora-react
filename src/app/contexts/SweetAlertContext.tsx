import { ReactNode, useCallback, useMemo } from "react"
import { createRoot, Root } from "react-dom/client"
import { CircularProgress } from "@mui/material"
import type { SweetAlertIcon } from "sweetalert2"
import {
  ConfirmWithLoadingOptions,
  NotificationOptions,
  SweetAlertContext,
} from "./sweetAlertContextValue"

const BRAND_GOLD = "#FFB300"

const wait = (milliseconds: number) =>
  new Promise(resolve => window.setTimeout(resolve, milliseconds))

async function loadSweetAlert() {
  const [{ default: Swal }] = await Promise.all([
    import("sweetalert2"),
    import("css/sweetAlert.css"),
  ])
  return Swal
}

export function SweetAlertProvider({ children }: { children: ReactNode }) {
  /* ALERT HANDLERS */
  const confirmWithLoading = useCallback(
    async ({
      title,
      message,
      confirmText = "Yes",
      cancelText = "No",
      loadingMs = 3000,
      onConfirm,
    }: ConfirmWithLoadingOptions) => {
      const Swal = await loadSweetAlert()
      let loaderRoot: Root | null = null
      let loaderHost: HTMLElement | null = null

      const result = await Swal.fire({
        icon: "question",
        iconColor: BRAND_GOLD,
        title,
        text: message,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        showCancelButton: true,
        position: "center",
        allowOutsideClick: false,
        allowEscapeKey: false,
        buttonsStyling: false,
        showClass: {
          popup: "cavora-coming-soon-show",
        },
        hideClass: {
          popup: "cavora-coming-soon-hide",
        },
        customClass: {
          container: "cavora-swal-container",
          popup: "cavora-swal-popup",
          icon: "cavora-swal-icon",
          title: "cavora-swal-title",
          htmlContainer: "cavora-swal-message",
          actions: "cavora-swal-actions",
          confirmButton: "cavora-swal-confirm",
          cancelButton: "cavora-swal-cancel",
        },
        preConfirm: async () => {
          const popup = Swal.getPopup()

          if (popup) {
            /* Pin the dialog to the box it already occupies. The icon, message
               and buttons are only hidden — never removed — so swapping in the
               spinner cannot reflow the popup and make it jump. */
            popup.style.height = `${popup.getBoundingClientRect().height}px`
            popup.classList.add("is-loading")

            loaderHost = document.createElement("div")
            loaderHost.className = "cavora-swal-loader"
            loaderHost.setAttribute("role", "status")
            loaderHost.setAttribute("aria-label", "Processing")
            popup.append(loaderHost)

            loaderRoot = createRoot(loaderHost)
            loaderRoot.render(
              <CircularProgress
                size={54}
                thickness={4.2}
                sx={{ color: BRAND_GOLD }}
              />,
            )
          }

          await Promise.all([wait(loadingMs), onConfirm?.()])
          return true
        },
        willClose: () => {
          /* SweetAlert2 reuses the popup element, so undo everything above. */
          const popup = Swal.getPopup()
          popup?.classList.remove("is-loading")
          popup?.style.removeProperty("height")

          loaderRoot?.unmount()
          loaderRoot = null
          loaderHost?.remove()
          loaderHost = null
        },
      })

      return result.isConfirmed
    },
    [],
  )

  /* NOTIFICATION HANDLERS */
  const notify = useCallback(
    async (icon: SweetAlertIcon, { title, message }: NotificationOptions) => {
      const Swal = await loadSweetAlert()
      await Swal.fire({
        icon,
        iconColor: icon === "error" ? "#E5484D" : BRAND_GOLD,
        title,
        text: message,
        timer: 2600,
        timerProgressBar: true,
        showConfirmButton: false,
        position: "center",
        showClass: {
          popup: "cavora-coming-soon-show",
        },
        hideClass: {
          popup: "cavora-coming-soon-hide",
        },
        customClass: {
          container: "cavora-toast-container",
          popup: "cavora-toast-popup",
          icon: "cavora-toast-icon",
          title: "cavora-toast-title",
          htmlContainer: "cavora-toast-message",
          timerProgressBar: "cavora-toast-progress",
        },
      })
    },
    [],
  )

  const showComingSoon = useCallback(async (platform: string) => {
    const Swal = await loadSweetAlert()
    await Swal.fire({
      icon: "info",
      iconColor: BRAND_GOLD,
      title: "Coming soon",
      text: `${platform} integration is on the way. Stay connected with Cavora!`,
      confirmButtonText: "Got it",
      buttonsStyling: false,
      showClass: {
        popup: "cavora-coming-soon-show",
      },
      hideClass: {
        popup: "cavora-coming-soon-hide",
      },
      customClass: {
        container: "cavora-coming-soon-container",
        popup: "cavora-coming-soon-popup",
        icon: "cavora-coming-soon-icon",
        title: "cavora-coming-soon-title",
        htmlContainer: "cavora-coming-soon-message",
        confirmButton: "cavora-coming-soon-confirm",
      },
    })
  }, [])

  const value = useMemo(
    () => ({ confirmWithLoading, notify, showComingSoon }),
    [confirmWithLoading, notify, showComingSoon],
  )

  return (
    <SweetAlertContext.Provider value={value}>
      {children}
    </SweetAlertContext.Provider>
  )
}
