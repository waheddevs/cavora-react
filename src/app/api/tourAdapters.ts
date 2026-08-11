import { ApiTourDetail, ApiTourSummary, Tour } from "app/types/tour"
import { resolveImageUrl } from "./baseApi"

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
    viewCount: tour.viewCount,
    days: `${tour.durationDays} Days`,
    group: `Max ${tour.maxGroupSize} People`,
    images: tour.images.map(image => resolveImageUrl(image.url)),
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
