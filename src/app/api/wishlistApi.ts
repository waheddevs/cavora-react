import { baseApi } from "./baseApi"
import { ApiTourSummary, adaptTourSummary } from "./tourAdapters"
import { Tour } from "app/types/tour"

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getWishlist: builder.query<Tour[], void>({
      query: () => "/users/me/wishlist",
      transformResponse: (response: { data: ApiTourSummary[] }) =>
        response.data.map(adaptTourSummary),
      providesTags: result => [
        { type: "Wishlist", id: "LIST" },
        ...(result?.map(tour => ({ type: "Wishlist" as const, id: tour.id })) ??
          []),
      ],
    }),
    addWishlistTour: builder.mutation<Tour, number>({
      query: tourId => ({
        url: `/users/me/wishlist/${tourId}`,
        method: "PUT",
      }),
      transformResponse: (response: { data: ApiTourSummary }) =>
        adaptTourSummary(response.data),
      async onQueryStarted(tourId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            wishlistApi.util.updateQueryData(
              "getWishlist",
              undefined,
              draft => {
                if (!draft.some(tour => tour.id === tourId)) draft.unshift(data)
              },
            ),
          )
        } catch {
          return
        }
      },
      invalidatesTags: ["User"],
    }),
    removeWishlistTour: builder.mutation<void, number>({
      query: tourId => ({
        url: `/users/me/wishlist/${tourId}`,
        method: "DELETE",
      }),
      async onQueryStarted(tourId, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          wishlistApi.util.updateQueryData("getWishlist", undefined, draft =>
            draft.filter(tour => tour.id !== tourId),
          ),
        )
        try {
          await queryFulfilled
        } catch {
          patch.undo()
        }
      },
      invalidatesTags: ["User"],
    }),
  }),
})

export const {
  useAddWishlistTourMutation,
  useGetWishlistQuery,
  useRemoveWishlistTourMutation,
} = wishlistApi
