import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { UserProfile, currentUser } from "app/data/userData"

export interface AuthRegistration {
  firstName: string
  lastName: string
  email: string
  username: string
}

export interface AuthState {
  user: UserProfile
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: currentUser,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<{ email: string }>) {
      state.user.email = action.payload.email
      state.isAuthenticated = true
    },
    register(state, action: PayloadAction<AuthRegistration>) {
      state.user = {
        ...currentUser,
        ...action.payload,
      }
      state.isAuthenticated = true
    },
    updateProfile(state, action: PayloadAction<Partial<UserProfile>>) {
      state.user = {
        ...state.user,
        ...action.payload,
      }
    },
    signOut(state) {
      state.isAuthenticated = false
    },
  },
})

export const { signIn, register, updateProfile, signOut } = authSlice.actions
export default authSlice.reducer
