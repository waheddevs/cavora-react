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
import { currentUser } from "app/data/userData"
import {
  PasswordChangeRequest,
  ProfileUpdateRequest,
  RegisterRequest,
} from "app/types/auth"

export function useAuth() {
  /* API HOOKS */
  const profileQuery = useGetProfileQuery()
  const [loginRequest, loginState] = useLoginMutation()
  const [registerRequest, registerState] = useRegisterMutation()
  const [logoutRequest, logoutState] = useLogoutMutation()
  const [updateProfileRequest, updateState] = useUpdateProfileMutation()
  const [changePasswordRequest, passwordState] = useChangePasswordMutation()
  const [uploadAvatarRequest, avatarUploadState] = useUploadAvatarMutation()
  const [removeAvatarRequest, avatarRemoveState] = useRemoveAvatarMutation()

  /* HANDLERS */
  const handleLogin = (email: string, password: string) =>
    loginRequest({ email, password }).unwrap()
  const handleSignup = (registration: RegisterRequest) =>
    registerRequest(registration).unwrap()
  const handleLogout = () => logoutRequest().unwrap()
  const handleSaveProfile = (profile: ProfileUpdateRequest) =>
    updateProfileRequest(profile).unwrap()
  const handleChangePassword = (passwords: PasswordChangeRequest) =>
    changePasswordRequest(passwords).unwrap()
  const handleUploadAvatar = (image: File) =>
    uploadAvatarRequest(image).unwrap()
  const handleRemoveAvatar = () => removeAvatarRequest().unwrap()

  return {
    user: profileQuery.data ?? currentUser,
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
  }
}
