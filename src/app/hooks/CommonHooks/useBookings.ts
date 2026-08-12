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
  const { notifyError, notifySuccess } = useNotifications()

  /* API HOOKS */
  const bookingQuery = useGetBookingHistoryQuery(
    { page: 1, limit: 50 },
    { skip: !isAuthenticated },
  )
  const [cancelRequest, cancelState] = useCancelBookingMutation()

  /* HANDLERS */
  const handleCancelBooking = async (bookingId: string, tourId: number) => {
    let cancellationSucceeded = true
    const confirmed = await confirmWithLoading({
      message: "Cancel this booking? Your reserved place will be released.",
      confirmText: "Cancel booking",
      cancelText: "Keep booking",
      loadingMs: 700,
      onConfirm: async () => {
        try {
          await cancelRequest({ bookingId, tourId }).unwrap()
        } catch {
          cancellationSucceeded = false
        }
      },
    })

    if (!confirmed) return
    if (cancellationSucceeded) {
      await notifySuccess({
        title: "Booking cancelled",
        message: "This journey has been removed from your upcoming plans.",
      })
      return
    }

    await notifyError({
      title: "Cancellation paused",
      message: "Your booking is still protected. Please return in a moment.",
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
