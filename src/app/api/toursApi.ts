import { baseApi } from "./baseApi"
import { adaptTourDetail, adaptTourSummary } from "./tourAdapters"
import {
  ApiPaginatedTours,
  ApiTourDetail,
  ApiTourSummary,
  AvailabilityResult,
  PaginatedTours,
  Tour,
  TourListQuery,
  TourViewResult,
} from "app/types/tour"
import { homeApi } from "./homeApi"

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
      providesTags: result =>
        result?.map(tour => ({ type: "Tour" as const, id: tour.id })) ?? [],
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
    recordTourView: builder.mutation<
      TourViewResult,
      { tourId: number; visitorId: string }
    >({
      query: ({ tourId, visitorId }) => ({
        url: `/tours/${tourId}/views`,
        method: "POST",
        body: { visitorId },
      }),
      transformResponse: (response: { data: TourViewResult }) => response.data,
      async onQueryStarted({ tourId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            homeApi.util.updateQueryData("getHome", undefined, draft => {
              const homeTours = [...draft.featuredTours, ...draft.popularTours]
              homeTours.forEach(tour => {
                if (tour.id === tourId) tour.viewCount = data.viewCount
              })
              if (draft.spotlight.tour?.id === tourId) {
                draft.spotlight.tour.viewCount = data.viewCount
              }
            }),
          )
        } catch {
          // Navigation must remain available if the analytics request fails.
        }
      },
      invalidatesTags: (result, _error, { tourId }) =>
        result?.counted
          ? [
              { type: "Tour", id: tourId },
              { type: "Tour", id: "LIST" },
              { type: "Wishlist", id: tourId },
            ]
          : [],
    }),
  }),
})

export const {
  useGetRelatedToursQuery,
  useGetTourAvailabilityQuery,
  useGetTourQuery,
  useGetToursQuery,
  useRecordTourViewMutation,
} = toursApi
