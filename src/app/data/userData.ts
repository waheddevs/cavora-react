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
