import { useMemo } from "react"
import { getTourById } from "app/data/tourData"
import { Tour } from "app/types/tour"
import { Booking } from "app/services/bookingService"
import { addBooking as addBookingRecord } from "app/store/bookingSlice"
import { useAppDispatch } from "app/hooks/CommonHooks/useAppDispatch"
import { useAppSelector } from "app/hooks/CommonHooks/useAppSelector"

export interface BookingWithTour extends Booking {
  tour: Tour
}

export function useBookings() {
  const dispatch = useAppDispatch()
  const records = useAppSelector(state => state.bookings.items)
  const bookings = useMemo(
    () =>
      records.reduce<BookingWithTour[]>((items, record) => {
        const tour = getTourById(record.tourId)
        if (tour) items.push({ ...record, tour })
        return items
      }, []),
    [records],
  )

  const addBooking = (
    tourId: number,
    date: string,
    travelers: number,
    total: number,
  ) => dispatch(addBookingRecord({ tourId, date, travelers, total }))

  return { bookings, addBooking }
}
