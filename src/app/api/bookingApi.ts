import { baseApi } from "./baseApi"
import { adaptTourSummary } from "./tourAdapters"
import {
  ApiBookingRecord,
  BookingDetails,
  BookingHold,
  BookingPagination,
  BookingRecord,
} from "app/types/booking"

export const bookingApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getBookingHistory: builder.query<
      { data: BookingRecord[]; meta: BookingPagination },
      { page?: number; limit?: number; status?: string } | void
    >({
      query: params => ({
        url: "/users/me/bookings",
        params: params ?? undefined,
      }),
      transformResponse: (response: {
        data: ApiBookingRecord[]
        meta: BookingPagination
      }) => ({
        ...response,
        data: response.data.map(booking => ({
          ...booking,
          total: booking.totalCents / 100,
          tour: booking.tour ? adaptTourSummary(booking.tour) : null,
        })),
      }),
      providesTags: result => [
        { type: "Booking", id: "LIST" },
        ...(result?.data.map(booking => ({
          type: "Booking" as const,
          id: booking.id,
        })) ?? []),
      ],
    }),
    createBookingHold: builder.mutation<
      BookingHold,
      { tourId: number; departureId: string; travelers: number }
    >({
      query: body => ({ url: "/booking-holds", method: "POST", body }),
      transformResponse: (response: { data: BookingHold }) => response.data,
      invalidatesTags: (_result, _error, request) => [
        { type: "Booking", id: "LIST" },
        { type: "Tour", id: `AVAILABILITY-${request.tourId}` },
        "User",
      ],
    }),
    getBooking: builder.query<BookingDetails, string>({
      query: bookingId => `/bookings/${bookingId}`,
      transformResponse: (response: { data: BookingHold }) => ({
        ...response.data,
        unitPrice: response.data.unitPriceCents / 100,
        subtotal: response.data.subtotalCents / 100,
        serviceFee: response.data.serviceFeeCents / 100,
        total: response.data.totalCents / 100,
      }),
      providesTags: (_result, _error, bookingId) => [
        { type: "Booking", id: bookingId },
      ],
    }),
    cancelBooking: builder.mutation<
      BookingHold,
      { bookingId: string; tourId: number }
    >({
      query: ({ bookingId }) => ({
        url: `/bookings/${bookingId}/cancel`,
        method: "POST",
      }),
      transformResponse: (response: { data: BookingHold }) => response.data,
      invalidatesTags: (_result, _error, request) => [
        { type: "Booking", id: "LIST" },
        { type: "Booking", id: request.bookingId },
        { type: "Tour", id: `AVAILABILITY-${request.tourId}` },
        "User",
      ],
    }),
  }),
})

export const {
  useCancelBookingMutation,
  useCreateBookingHoldMutation,
  useGetBookingHistoryQuery,
  useGetBookingQuery,
} = bookingApi
