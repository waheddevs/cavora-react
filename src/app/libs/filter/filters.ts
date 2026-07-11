import type { Tour } from "../types"

/* ===========================
   FILTER & SORT TYPES
=========================== */

export interface TourFilters {
  destinations: string[]
  price: [number, number]
  durations: string[] // "short" | "mid" | "long"
  types: string[]
  minRating: number
}

export type SortKey =
  | "default"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "days-asc"
  | "days-desc"

/* ===========================
   FILTER OPTION LISTS
=========================== */

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "days-asc", label: "Shortest First" },
  { value: "days-desc", label: "Longest First" },
]

export const durationBuckets = [
  { id: "short", label: "2 – 4 Days" },
  { id: "mid", label: "5 – 6 Days" },
  { id: "long", label: "7+ Days" },
]

export const ratingOptions = [
  { value: 0, label: "All Ratings" },
  { value: 4.5, label: "4.5 & up" },
  { value: 4.0, label: "4.0 & up" },
  { value: 3.5, label: "3.5 & up" },
]

export const tourTypes = ["Adventure", "Cultural", "Beach", "Nature", "City"]

/* ===========================
   FILTER HELPERS
=========================== */

const dayNum = (days: string) => parseInt(days, 10) || 0

const bucketOf = (days: string) => {
  const n = dayNum(days)
  if (n <= 4) return "short"
  if (n <= 6) return "mid"
  return "long"
}

export const makeDefaultFilters = (
  min: number,
  max: number,
): TourFilters => ({
  destinations: [],
  price: [min, max],
  durations: [],
  types: [],
  minRating: 0,
})

/* ===========================
   FILTER & SORT LOGIC
=========================== */

export function filterTours(tours: Tour[], f: TourFilters): Tour[] {
  return tours.filter((t) => {
    if (f.destinations.length && !f.destinations.includes(t.country)) return false
    if (t.price < f.price[0] || t.price > f.price[1]) return false
    if (f.durations.length && !f.durations.includes(bucketOf(t.days))) return false
    if (f.types.length && !f.types.includes(t.type)) return false
    if (t.rating < f.minRating) return false
    return true
  })
}

export function sortTours(tours: Tour[], key: SortKey): Tour[] {
  const arr = [...tours]
  switch (key) {
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price)
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price)
    case "rating":
      return arr.sort((a, b) => b.rating - a.rating)
    case "days-asc":
      return arr.sort((a, b) => dayNum(a.days) - dayNum(b.days))
    case "days-desc":
      return arr.sort((a, b) => dayNum(b.days) - dayNum(a.days))
    default:
      return arr.sort((a, b) => a.id - b.id)
  }
}
