import { getTourById } from "app/data/tourData"

export type BookingStatus = "Upcoming" | "Completed"

export interface Booking {
  id: number
  tourId: number
  status: BookingStatus
  date: string
  travelers: number
  total: number
}

const getTourPrice = (tourId: number) => getTourById(tourId)?.price ?? 0

const initialBookings: Booking[] = [
  {
    id: 1,
    tourId: 17,
    status: "Upcoming",
    date: "Aug 14, 2026",
    travelers: 2,
    total: getTourPrice(17) * 2,
  },
  {
    id: 2,
    tourId: 5,
    status: "Upcoming",
    date: "Sep 02, 2026",
    travelers: 1,
    total: getTourPrice(5),
  },
  {
    id: 3,
    tourId: 1,
    status: "Completed",
    date: "Jan 20, 2026",
    travelers: 2,
    total: getTourPrice(1) * 2,
  },
  {
    id: 4,
    tourId: 9,
    status: "Completed",
    date: "Nov 11, 2025",
    travelers: 3,
    total: getTourPrice(9) * 3,
  },
]

export function getInitialBookings(): Booking[] {
  return initialBookings.map(booking => ({ ...booking }))
}
