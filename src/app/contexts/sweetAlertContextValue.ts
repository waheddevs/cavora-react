import { createContext } from "react"
import type { SweetAlertIcon } from "sweetalert2"

export interface ConfirmWithLoadingOptions {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  loadingMs?: number
  onConfirm?: () => void | Promise<void>
}

export interface NotificationOptions {
  title: string
  message?: string
}

export interface SweetAlertContextValue {
  confirmWithLoading: (options: ConfirmWithLoadingOptions) => Promise<boolean>
  notify: (icon: SweetAlertIcon, options: NotificationOptions) => Promise<void>
  showComingSoon: (platform: string) => Promise<void>
}

export const SweetAlertContext = createContext<SweetAlertContextValue | null>(
  null,
)
