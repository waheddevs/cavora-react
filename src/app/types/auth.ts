export interface ApiMember {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  phone?: string
  location?: string
  avatarUrl?: string
  role: string
  status: string
  emailVerified: boolean
  createdAt: string
  lastSignInAt?: string
  stats?: {
    activeSessions: number
    bookings: number
    wishlist: number
  }
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest extends LoginRequest {
  username: string
  firstName: string
  lastName: string
}

export interface ProfileUpdateRequest {
  email?: string
  username?: string
  firstName?: string
  lastName?: string
  phone?: string
  location?: string
  avatarUrl?: string
}

export interface PasswordChangeRequest {
  currentPassword: string
  newPassword: string
}

export interface MessageResponse {
  message: string
}

export type LoginValues = LoginRequest
export type LoginErrors = Partial<Record<keyof LoginValues, string>>
export type SignupValues = RegisterRequest
export type SignupErrors = Partial<Record<keyof SignupValues, string>>
