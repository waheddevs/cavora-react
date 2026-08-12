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
  { label: string; title: string; message: string }
> = {
  past: {
    label: "Past Trips",
    title: "Clear past trips?",
    message:
      "These trips will disappear from My Bookings, but their records will remain safely archived.",
  },
  cancelled: {
    label: "Cancelled",
    title: "Clear cancelled bookings?",
    message:
      "These bookings will disappear from My Bookings, but their records will remain safely archived.",
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
      title: copy.title,
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
