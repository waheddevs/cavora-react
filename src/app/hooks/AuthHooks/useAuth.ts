import {
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
} from "app/api/authApi"
import { currentUser } from "app/data/userData"
import { ProfileUpdateRequest, RegisterRequest } from "app/types/auth"

export function useAuth() {
  /* API HOOKS */
  const profileQuery = useGetProfileQuery()
  const [loginRequest, loginState] = useLoginMutation()
  const [registerRequest, registerState] = useRegisterMutation()
  const [logoutRequest, logoutState] = useLogoutMutation()
  const [updateProfileRequest, updateState] = useUpdateProfileMutation()

  /* HANDLERS */
  const handleLogin = (email: string, password: string) =>
    loginRequest({ email, password }).unwrap()
  const handleSignup = (registration: RegisterRequest) =>
    registerRequest(registration).unwrap()
  const handleLogout = () => logoutRequest().unwrap()
  const handleSaveProfile = (profile: ProfileUpdateRequest) =>
    updateProfileRequest(profile).unwrap()

  return {
    user: profileQuery.data ?? currentUser,
    isAuthenticated: Boolean(profileQuery.data),
    isAuthLoading: profileQuery.isLoading,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    saveProfile: handleSaveProfile,
    loginPending: loginState.isLoading,
    signupPending: registerState.isLoading,
    logoutPending: logoutState.isLoading,
    profileSaving: updateState.isLoading,
  }
}
