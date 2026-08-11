import { baseApi } from "./baseApi"
import { adaptTourSummary } from "./tourAdapters"
import { ApiHomeData, HomeData } from "app/types/home"

export const homeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getHome: builder.query<HomeData, void>({
      query: () => "/home",
      transformResponse: (response: { data: ApiHomeData }) => ({
        ...response.data,
        featuredTours: response.data.featuredTours.map(adaptTourSummary),
        popularTours: response.data.popularTours.map(adaptTourSummary),
        spotlight: {
          ...response.data.spotlight,
          tour: response.data.spotlight.tour
            ? adaptTourSummary(response.data.spotlight.tour)
            : null,
        },
      }),
      providesTags: ["Home"],
    }),
  }),
})

export const { useGetHomeQuery } = homeApi
