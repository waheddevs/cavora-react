import { useLocation } from "react-router-dom"
import { useCallback, useMemo } from "react"
import {
  useChangePasswordMutation,
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useRemoveAvatarMutation,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from "app/api/authApi"
import {
  PasswordChangeRequest,
  ProfileUpdateRequest,
  RegisterRequest,
} from "app/types/auth"
import { UserProfile } from "app/types/user"

/* Signed-out and failed-request states used to fall back to a fabricated
   person, which showed a stranger's name and email as though it were yours.
   The blanks keep the shape consumers expect without inventing an identity;
   `isAuthenticated` remains the flag to branch on. */
const emptyProfile: UserProfile = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  phone: "",
  location: "",
  avatar: "",
  memberSince: "",
  role: "",
  status: "",
  emailVerified: false,
  stats: { activeSessions: 0, bookings: 0, wishlist: 0 },
}

const sessionlessRoutes = new Set([
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
])

export function useAuthState() {
  const { pathname } = useLocation()
  const profileQuery = useGetProfileQuery(undefined, {
    skip: sessionlessRoutes.has(pathname),
  })
  const [loginRequest, loginState] = useLoginMutation()
  const [registerRequest, registerState] = useRegisterMutation()
  const [logoutRequest, logoutState] = useLogoutMutation()
  const [updateProfileRequest, updateState] = useUpdateProfileMutation()
  const [changePasswordRequest, passwordState] = useChangePasswordMutation()
  const [uploadAvatarRequest, avatarUploadState] = useUploadAvatarMutation()
  const [removeAvatarRequest, avatarRemoveState] = useRemoveAvatarMutation()

  const handleLogin = useCallback(
    (email: string, password: string) =>
      loginRequest({ email, password }).unwrap(),
    [loginRequest],
  )
  const handleSignup = useCallback(
    (registration: RegisterRequest) => registerRequest(registration).unwrap(),
    [registerRequest],
  )
  const handleLogout = useCallback(
    () => logoutRequest().unwrap(),
    [logoutRequest],
  )
  const handleSaveProfile = useCallback(
    (profile: ProfileUpdateRequest) => updateProfileRequest(profile).unwrap(),
    [updateProfileRequest],
  )
  const handleChangePassword = useCallback(
    (passwords: PasswordChangeRequest) =>
      changePasswordRequest(passwords).unwrap(),
    [changePasswordRequest],
  )
  const handleUploadAvatar = useCallback(
    (image: File) => uploadAvatarRequest(image).unwrap(),
    [uploadAvatarRequest],
  )
  const handleRemoveAvatar = useCallback(
    () => removeAvatarRequest().unwrap(),
    [removeAvatarRequest],
  )

  return useMemo(
    () => ({
      user: profileQuery.data ?? emptyProfile,
      isAuthenticated: Boolean(profileQuery.data),
      isAuthLoading: profileQuery.isLoading,
      login: handleLogin,
      signup: handleSignup,
      logout: handleLogout,
      saveProfile: handleSaveProfile,
      changePassword: handleChangePassword,
      uploadAvatar: handleUploadAvatar,
      removeAvatar: handleRemoveAvatar,
      loginPending: loginState.isLoading,
      signupPending: registerState.isLoading,
      logoutPending: logoutState.isLoading,
      profileSaving: updateState.isLoading,
      passwordChanging: passwordState.isLoading,
      avatarUploading: avatarUploadState.isLoading,
      avatarRemoving: avatarRemoveState.isLoading,
    }),
    [
      avatarRemoveState.isLoading,
      avatarUploadState.isLoading,
      handleChangePassword,
      handleLogin,
      handleLogout,
      handleRemoveAvatar,
      handleSaveProfile,
      handleSignup,
      handleUploadAvatar,
      loginState.isLoading,
      logoutState.isLoading,
      passwordState.isLoading,
      profileQuery.data,
      profileQuery.isLoading,
      registerState.isLoading,
      updateState.isLoading,
    ],
  )
}
