import { baseApi } from "./baseApi"
import { adaptTourSummary } from "./tourAdapters"
import { resolveImageUrl } from "./baseApi"
import { ApiHomeData, HomeData } from "app/types/home"

export const homeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getHome: builder.query<HomeData, void>({
      query: () => "/home",
      transformResponse: (response: { data: ApiHomeData }) => ({
        ...response.data,
        slides: response.data.slides.map(slide => ({
          ...slide,
          imageUrl: resolveImageUrl(slide.imageUrl),
        })),
        featuredTours: response.data.featuredTours.map(adaptTourSummary),
        popularTours: response.data.popularTours.map(adaptTourSummary),
        spotlight: {
          ...response.data.spotlight,
          imageUrl: resolveImageUrl(response.data.spotlight.imageUrl),
          tour: response.data.spotlight.tour
            ? adaptTourSummary(response.data.spotlight.tour)
            : null,
        },
        gallery: response.data.gallery.map(image => ({
          ...image,
          imageUrl: resolveImageUrl(image.imageUrl),
        })),
      }),
      providesTags: ["Home"],
      keepUnusedDataFor: 300,
    }),
  }),
})

export const { useGetHomeQuery } = homeApi
