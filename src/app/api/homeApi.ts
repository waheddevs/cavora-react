import { baseApi } from "./baseApi"
import { adaptTourSummary } from "./tourAdapters"
import { resolveImageUrl } from "./baseApi"
import { ApiHomeData, GalleryImage, HomeData } from "app/types/home"

// Swaps the thumbnail the home endpoint returns for the high-resolution
// gallery crop. Keys are API values, not local files.
const galleryImageOverrides: Record<string, string> = {
  "/img/home-page-img/hero.webp": "/img/home-page-img/gallery-hq-jungfrau.webp",
  "/img/home-page-img/gallery-1.webp":
    "/img/home-page-img/gallery-hq-rome.webp",
  "/img/home-page-img/tour-safari.webp":
    "/img/home-page-img/gallery-hq-lucerne.webp",
}

const galleryTourReplacements: Record<number, GalleryImage> = {
  24: {
    altText: "Gondolas along a quiet Venice canal",
    category: "Cultural",
    imageUrl: "/img/home-page-img/gallery-venice.webp",
    location: "Venice, Italy",
    tall: false,
    title: "Venetian Canal Stories",
    tourId: 14,
  },
}

function resolveGalleryImageUrl(path: string) {
  const resolved = resolveImageUrl(path)
  return galleryImageOverrides[resolved] ?? resolved
}

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
        gallery: response.data.gallery.map(image => {
          const galleryItem = galleryTourReplacements[image.tourId] ?? image

          return {
            ...galleryItem,
            imageUrl: resolveGalleryImageUrl(galleryItem.imageUrl),
          }
        }),
      }),
      providesTags: ["Home"],
      keepUnusedDataFor: 300,
    }),
  }),
})

export const { useGetHomeQuery } = homeApi
