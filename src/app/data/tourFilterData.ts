import { SortKey } from "app/utils/tourFilters"

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
