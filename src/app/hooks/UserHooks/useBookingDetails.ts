import { useState } from "react"
import { useGetBookingQuery } from "app/api/bookingApi"
import { BookingRecord } from "app/types/booking"

export function useBookingDetails() {
  /* STATE */
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(
    null,
  )

  /* API HOOKS */
  const bookingQuery = useGetBookingQuery(selectedBooking?.id ?? "", {
    skip: !selectedBooking,
    refetchOnMountOrArgChange: true,
  })

  /* HANDLERS */
  const handleOpenBookingDetails = (booking: BookingRecord) => {
    setSelectedBooking(booking)
  }

  const handleCloseBookingDetails = () => {
    setSelectedBooking(null)
  }

  return {
    booking: bookingQuery.data,
    selectedBooking,
    isDetailsOpen: Boolean(selectedBooking),
    isDetailsLoading: bookingQuery.isFetching,
    isDetailsError: bookingQuery.isError,
    handleOpenBookingDetails,
    handleCloseBookingDetails,
  }
}
