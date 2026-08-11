export interface TourItineraryDay {
  title: string
  text: string
}

export interface Tour {
  id: number
  country: string
  place: string
  title: string
  location: string
  type: string
  price: number
  oldPrice: number
  rating: number
  reviews: number
  viewCount: number
  days: string
  group: string
  images: string[]
  overview: string
  highlights: string[]
  itinerary: TourItineraryDay[]
  included: string[]
  notIncluded: string[]
}

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
  viewCount: number
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

export interface ApiPaginatedTours extends Omit<PaginatedTours, "data"> {
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

export interface TourViewResult {
  counted: boolean
  tourId: number
  viewCount: number
}

export interface TourFilters {
  destinations: string[]
  price: [number, number]
  durations: string[]
  types: string[]
  minRating: number
}

export type SortKey =
  "default" | "price-asc" | "price-desc" | "rating" | "days-asc" | "days-desc"
