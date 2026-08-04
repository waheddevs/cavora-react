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
  days: string
  group: string
  images: string[]
  overview: string
  highlights: string[]
  itinerary: TourItineraryDay[]
  included: string[]
  notIncluded: string[]
}
