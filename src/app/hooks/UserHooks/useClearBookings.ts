import {
  BookingArchiveGroup,
  useArchiveBookingHistoryMutation,
} from "app/api/bookingApi"
import {
  useAlerts,
  useNotifications,
} from "app/hooks/CommonHooks/useSweetAlert"

const groupCopy: Record<
  BookingArchiveGroup,
  { label: string; message: string }
> = {
  past: {
    label: "Past Trips",
    message:
      "Clear all past trips from My Bookings? Your booking records will remain safely archived.",
  },
  cancelled: {
    label: "Cancelled",
    message:
      "Clear all cancelled bookings from My Bookings? Your booking records will remain safely archived.",
  },
}

export function useClearBookings() {
  const { confirmWithLoading } = useAlerts()
  const { notifyError } = useNotifications()
  const [archiveBookingHistory, archiveState] =
    useArchiveBookingHistoryMutation()

  const clearBookings = async (group: BookingArchiveGroup) => {
    let archiveSucceeded = true
    const copy = groupCopy[group]
    const confirmed = await confirmWithLoading({
      message: copy.message,
      confirmText: `Clear ${copy.label}`,
      cancelText: "Keep history",
      loadingMs: 600,
      onConfirm: async () => {
        try {
          await archiveBookingHistory({ group }).unwrap()
        } catch {
          archiveSucceeded = false
        }
      },
    })

    if (!confirmed || archiveSucceeded) return

    await notifyError({
      title: "History could not be cleared",
      message: "Your bookings are unchanged. Please try again in a moment.",
    })
  }

  return {
    clearBookings,
    isClearing: archiveState.isLoading,
  }
}
