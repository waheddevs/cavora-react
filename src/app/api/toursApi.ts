import { baseApi } from "./baseApi"
import {
  ApiTourDetail,
  ApiTourSummary,
  adaptTourDetail,
  adaptTourSummary,
} from "./tourAdapters"
import { Tour } from "app/types/tour"

export type ApiTourSort =
  "price-asc" | "price-desc" | "rating" | "duration" | "popularity"

export interface TourListQuery {
  page?: number
  limit?: number
  query?: string
  destination?: string
  type?: string
  minPrice?: number
  maxPrice?: number
  duration?: "short" | "medium" | "long"
  minRating?: number
  sort?: ApiTourSort
}

export interface PaginatedTours {
  data: Tour[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

interface ApiPaginatedTours extends Omit<PaginatedTours, "data"> {
  data: ApiTourSummary[]
}

export interface AvailableDeparture {
  id: string
  startDate: string
  availableSeats: number
  priceCents: number
  currency: string
}

export interface AvailabilityResult {
  tourId: number
  travelers: number
  departures: AvailableDeparture[]
}

export const toursApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getTours: builder.query<PaginatedTours, TourListQuery | void>({
      query: query => ({ url: "/tours", params: query ?? undefined }),
      transformResponse: (response: ApiPaginatedTours) => ({
        ...response,
        data: response.data.map(adaptTourSummary),
      }),
      providesTags: result => [
        { type: "Tour", id: "LIST" },
        ...(result?.data.map(tour => ({
          type: "Tour" as const,
          id: tour.id,
        })) ?? []),
      ],
    }),
    getTour: builder.query<Tour, number>({
      query: tourId => `/tours/${tourId}`,
      transformResponse: (response: { data: ApiTourDetail }) =>
        adaptTourDetail(response.data),
      providesTags: (_result, _error, tourId) => [{ type: "Tour", id: tourId }],
    }),
    getRelatedTours: builder.query<Tour[], number>({
      query: tourId => `/tours/${tourId}/related`,
      transformResponse: (response: { data: ApiTourSummary[] }) =>
        response.data.map(adaptTourSummary),
    }),
    getTourAvailability: builder.query<
      AvailabilityResult,
      { tourId: number; travelers: number; from?: string; to?: string }
    >({
      query: ({ tourId, ...params }) => ({
        url: `/tours/${tourId}/availability`,
        params,
      }),
      transformResponse: (response: { data: AvailabilityResult }) =>
        response.data,
      providesTags: (_result, _error, query) => [
        { type: "Tour", id: `AVAILABILITY-${query.tourId}` },
      ],
    }),
  }),
})

export const {
  useGetRelatedToursQuery,
  useGetTourAvailabilityQuery,
  useGetTourQuery,
  useGetToursQuery,
} = toursApi
