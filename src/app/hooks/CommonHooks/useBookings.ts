import {
  useCancelBookingMutation,
  useGetBookingHistoryQuery,
} from "app/api/bookingApi"
import { useAuth } from "app/hooks/AuthHooks/useAuth"
import {
  useAlerts,
  useNotifications,
} from "app/hooks/CommonHooks/useSweetAlert"

export function useBookings() {
  /* DOMAIN HOOKS */
  const { isAuthenticated } = useAuth()
  const { confirmWithLoading } = useAlerts()
  const { notifyError, notifyInfo, notifySuccess } = useNotifications()

  /* API HOOKS */
  const bookingQuery = useGetBookingHistoryQuery(
    { page: 1, limit: 50 },
    { skip: !isAuthenticated },
  )
  const [cancelRequest, cancelState] = useCancelBookingMutation()

  /* HANDLERS */
  const handleCancelBooking = async (bookingId: string, tourId: number) => {
    const cancellation = { succeeded: true, status: "" }
    const confirmed = await confirmWithLoading({
      title: "Cancel this booking?",
      message:
        "Payment holds are released immediately. Confirmed bookings are sent for cancellation review.",
      confirmText: "Cancel booking",
      cancelText: "Keep booking",
      loadingMs: 700,
      onConfirm: async () => {
        try {
          const updatedBooking = await cancelRequest({
            bookingId,
            tourId,
          }).unwrap()
          cancellation.status = updatedBooking.status.toUpperCase()
        } catch {
          cancellation.succeeded = false
        }
      },
    })

    if (!confirmed) return

    if (!cancellation.succeeded) {
      await notifyError({
        title: "Cancellation paused",
        message: "Your booking is still protected. Please return in a moment.",
      })
      return
    }

    if (cancellation.status === "CANCELLED") {
      await notifySuccess({
        title: "Booking cancelled",
        message: "This journey has been removed from your upcoming plans.",
      })
      return
    }

    if (cancellation.status === "CANCELLATION_REQUESTED") {
      await notifyInfo({
        title: "Cancellation requested",
        message:
          "Your confirmed booking remains active while the cancellation request is reviewed.",
      })
      return
    }

    if (cancellation.status === "EXPIRED") {
      await notifyInfo({
        title: "Booking hold expired",
        message:
          "The payment hold had already ended, so the reserved place was released.",
      })
      return
    }

    await notifyInfo({
      title: "Booking updated",
      message: "The latest booking status is now visible in My Bookings.",
    })
  }

  // Payment is intentionally still mocked. The real booking hold is already
  // created before checkout, so payment completion only refreshes history.
  const handlePaymentComplete = (
    _tourId: number,
    _date: string,
    _travelers: number,
    _total: number,
  ): Promise<void> => {
    if (!isAuthenticated) return Promise.resolve()
    return bookingQuery.refetch().then(() => undefined)
  }

  return {
    bookings: bookingQuery.data?.data ?? [],
    addBooking: handlePaymentComplete,
    handleCancelBooking,
    isLoading: bookingQuery.isLoading,
    isError: bookingQuery.isError || cancelState.isError,
    cancelling: cancelState.isLoading,
  }
}
