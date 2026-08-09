import { baseApi } from "./baseApi"
import { ApiTourSummary, adaptTourSummary } from "./tourAdapters"
import { Tour } from "app/types/tour"

export interface HeroSlide {
  imageUrl: string
  location: string
  subtitle: string
  title: string
}

export interface GalleryImage {
  altText: string
  imageUrl: string
  tall: boolean
}

interface ApiHomeData {
  slides: HeroSlide[]
  featuredTours: ApiTourSummary[]
  popularTours: ApiTourSummary[]
  spotlight: {
    imageUrl: string
    subtitle: string
    tagline: string
    title: string
    tour: ApiTourSummary | null
  }
  gallery: GalleryImage[]
}

export interface HomeData extends Omit<
  ApiHomeData,
  "featuredTours" | "popularTours" | "spotlight"
> {
  featuredTours: Tour[]
  popularTours: Tour[]
  spotlight: Omit<ApiHomeData["spotlight"], "tour"> & { tour: Tour | null }
}

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
