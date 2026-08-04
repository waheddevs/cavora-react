import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Booking, getInitialBookings } from "app/services/bookingService"

export interface NewBooking {
  tourId: number
  date: string
  travelers: number
  total: number
}

export interface BookingState {
  items: Booking[]
}

const initialState: BookingState = {
  items: getInitialBookings(),
}

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking(state, action: PayloadAction<NewBooking>) {
      const nextId = state.items.length
        ? Math.max(...state.items.map(booking => booking.id)) + 1
        : 1

      state.items.unshift({
        id: nextId,
        status: "Upcoming",
        ...action.payload,
      })
    },
  },
})

export const { addBooking } = bookingSlice.actions
export default bookingSlice.reducer
