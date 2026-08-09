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

export const currentUser: UserProfile = {
  id: "",
  firstName: "Amelia",
  lastName: "Carter",
  email: "amelia.carter@gmail.com",
  username: "amelia_c",
  phone: "+1 415 902 7788",
  location: "San Francisco, USA",
  avatar: "/img/team-img/member-5.jpg",
  memberSince: "March 2023",
  role: "MEMBER",
  status: "ACTIVE",
  emailVerified: false,
  stats: { activeSessions: 0, bookings: 0, wishlist: 0 },
}
