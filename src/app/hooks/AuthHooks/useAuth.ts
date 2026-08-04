import {
  AuthRegistration,
  signIn,
  register,
  signOut,
  updateProfile,
} from "app/store/authSlice"
import { UserProfile } from "app/data/userData"
import { useAppDispatch } from "app/hooks/CommonHooks/useAppDispatch"
import { useAppSelector } from "app/hooks/CommonHooks/useAppSelector"

export function useAuth() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  const login = (email: string) => dispatch(signIn({ email }))
  const signup = (registration: AuthRegistration) =>
    dispatch(register(registration))
  const logout = () => dispatch(signOut())
  const saveProfile = (profile: Partial<UserProfile>) =>
    dispatch(updateProfile(profile))

  return { user, isAuthenticated, login, signup, logout, saveProfile }
}
