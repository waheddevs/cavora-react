import { ApiTourSummary, Tour } from "./tour"

export interface HeroSlide {
  imageUrl: string
  location: string
  subtitle: string
  title: string
}

export interface GalleryImage {
  altText: string
  category: string
  imageUrl: string
  location: string
  tall: boolean
  title: string
  tourId: number
}

export interface ApiHomeData {
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
