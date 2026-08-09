import { Tour } from "app/types/tour"

export interface ApiTourImage {
  altText: string
  position: number
  url: string
}

export interface ApiTourSummary {
  id: number
  slug: string
  country: string
  place: string
  title: string
  location: string
  type: string
  priceCents: number
  oldPriceCents?: number
  currency: string
  ratingAverage: number
  reviewCount: number
  durationDays: number
  maxGroupSize: number
  images: ApiTourImage[]
}

export interface ApiTourDetail extends ApiTourSummary {
  overview: string
  highlights: string[]
  itinerary: Array<{ day: number; title: string; description: string }>
  included: string[]
  notIncluded: string[]
}

export function adaptTourSummary(tour: ApiTourSummary): Tour {
  return {
    id: tour.id,
    country: tour.country,
    place: tour.place,
    title: tour.title,
    location: tour.location,
    type: tour.type,
    price: tour.priceCents / 100,
    oldPrice: (tour.oldPriceCents ?? tour.priceCents) / 100,
    rating: tour.ratingAverage,
    reviews: tour.reviewCount,
    days: `${tour.durationDays} Days`,
    group: `Max ${tour.maxGroupSize} People`,
    images: tour.images.map(image => image.url),
    overview: "",
    highlights: [],
    itinerary: [],
    included: [],
    notIncluded: [],
  }
}

export function adaptTourDetail(tour: ApiTourDetail): Tour {
  return {
    ...adaptTourSummary(tour),
    overview: tour.overview,
    highlights: tour.highlights,
    itinerary: tour.itinerary.map(item => ({
      title: item.title,
      text: item.description,
    })),
    included: tour.included,
    notIncluded: tour.notIncluded,
  }
}
