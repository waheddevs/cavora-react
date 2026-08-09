import {
  useCancelBookingMutation,
  useGetBookingHistoryQuery,
} from "app/api/bookingApi"
import { useAuth } from "app/hooks/AuthHooks/useAuth"

export function useBookings() {
  /* DOMAIN HOOKS */
  const { isAuthenticated } = useAuth()

  /* API HOOKS */
  const bookingQuery = useGetBookingHistoryQuery(
    { page: 1, limit: 50 },
    { skip: !isAuthenticated },
  )
  const [cancelRequest, cancelState] = useCancelBookingMutation()

  /* HANDLERS */
  const handleCancelBooking = async (bookingId: string, tourId: number) => {
    try {
      await cancelRequest({ bookingId, tourId }).unwrap()
    } catch {
      return
    }
  }

  const handleRetry = () => {
    void bookingQuery.refetch()
  }

  // Payment is intentionally still mocked. The real booking hold is already
  // created before checkout, so payment completion only refreshes history.
  const handlePaymentComplete = (
    _tourId: number,
    _date: string,
    _travelers: number,
    _total: number,
  ) => bookingQuery.refetch()

  return {
    bookings: bookingQuery.data?.data ?? [],
    addBooking: handlePaymentComplete,
    handleCancelBooking,
    isLoading: bookingQuery.isLoading,
    isError: bookingQuery.isError || cancelState.isError,
    handleRetry,
    cancelling: cancelState.isLoading,
  }
}
