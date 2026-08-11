export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  username: string
  phone: string
  location: string
  avatar: string
  memberSince: string
  role: string
  status: string
  emailVerified: boolean
  stats: {
    activeSessions: number
    bookings: number
    wishlist: number
  }
}

export interface AccountSettingsForm {
  firstName: string
  lastName: string
  email: string
  username: string
  phone: string
  location: string
}

export type UserTab = "profile" | "bookings" | "wishlist" | "support"
