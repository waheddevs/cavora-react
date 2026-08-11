import { SortKey, Tour, TourFilters } from "app/types/tour"

const getDayCount = (days: string) => parseInt(days, 10) || 0

const getDurationBucket = (days: string) => {
  const dayCount = getDayCount(days)
  if (dayCount <= 4) return "short"
  if (dayCount <= 6) return "mid"
  return "long"
}

export const makeDefaultFilters = (min: number, max: number): TourFilters => ({
  destinations: [],
  price: [min, max],
  durations: [],
  types: [],
  minRating: 0,
})

export function filterTours(tours: Tour[], filters: TourFilters): Tour[] {
  return tours.filter(tour => {
    if (
      filters.destinations.length &&
      !filters.destinations.includes(tour.country)
    ) {
      return false
    }
    if (tour.price < filters.price[0] || tour.price > filters.price[1]) {
      return false
    }
    if (
      filters.durations.length &&
      !filters.durations.includes(getDurationBucket(tour.days))
    ) {
      return false
    }
    if (filters.types.length && !filters.types.includes(tour.type)) return false
    if (tour.rating < filters.minRating) return false
    return true
  })
}

export function sortTours(tours: Tour[], key: SortKey): Tour[] {
  const sortedTours = [...tours]

  switch (key) {
    case "price-asc":
      return sortedTours.sort((first, second) => first.price - second.price)
    case "price-desc":
      return sortedTours.sort((first, second) => second.price - first.price)
    case "rating":
      return sortedTours.sort((first, second) => second.rating - first.rating)
    case "days-asc":
      return sortedTours.sort(
        (first, second) => getDayCount(first.days) - getDayCount(second.days),
      )
    case "days-desc":
      return sortedTours.sort(
        (first, second) => getDayCount(second.days) - getDayCount(first.days),
      )
    default:
      return sortedTours.sort((first, second) => first.id - second.id)
  }
}
