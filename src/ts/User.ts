/* User account data — mock profile and bookings for the user page.
   Static only; bookings reuse the shared Tour catalogue. Wishlist lives in ts/wishlist. */

import type { Tour } from "app/libs/types"
import { getTourById } from "ts/TourSingle"

export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  username: string
  phone: string
  location: string
  avatar: string
  memberSince: string
}

export type BookingStatus = "Upcoming" | "Completed"

export interface Booking {
  id: number
  tour: Tour
  status: BookingStatus
  date: string
  travelers: number
  total: number
}

/* Signed-in user (matches the signup form fields) */
export const currentUser: UserProfile = {
  firstName: "Amelia",
  lastName: "Carter",
  email: "amelia.carter@gmail.com",
  username: "amelia_c",
  phone: "+1 415 902 7788",
  location: "San Francisco, USA",
  avatar: "/img/team-img/member-5.jpg",
  memberSince: "March 2023",
}

/* Booked / purchased tours — looked up from the tour catalogue by id */
export const bookings: Booking[] = [
  {
    id: 1,
    tour: getTourById(17)!,
    status: "Upcoming",
    date: "Aug 14, 2026",
    travelers: 2,
    total: getTourById(17)!.price * 2,
  },
  {
    id: 2,
    tour: getTourById(5)!,
    status: "Upcoming",
    date: "Sep 02, 2026",
    travelers: 1,
    total: getTourById(5)!.price,
  },
  {
    id: 3,
    tour: getTourById(1)!,
    status: "Completed",
    date: "Jan 20, 2026",
    travelers: 2,
    total: getTourById(1)!.price * 2,
  },
  {
    id: 4,
    tour: getTourById(9)!,
    status: "Completed",
    date: "Nov 11, 2025",
    travelers: 3,
    total: getTourById(9)!.price * 3,
  },
]

/* Number of distinct countries across the user's bookings */
export const bookedCountries = new Set(bookings.map((b) => b.tour.country)).size
