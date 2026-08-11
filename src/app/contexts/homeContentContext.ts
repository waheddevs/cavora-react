import { createContext } from "react"
import { GalleryImage, HeroSlide, HomeData } from "app/types/home"
import { Tour } from "app/types/tour"

export interface HomeContentContextValue {
  home?: HomeData
  slides: HeroSlide[]
  featuredTours: Tour[]
  popularTours: Tour[]
  spotlight?: HomeData["spotlight"]
  gallery: GalleryImage[]
  isLoading: boolean
  isError: boolean
}

export const HomeContentContext =
  createContext<HomeContentContextValue | null>(null)
