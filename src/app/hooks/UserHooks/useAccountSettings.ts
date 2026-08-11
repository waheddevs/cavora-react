import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "app/hooks/AuthHooks/useAuth"
import { useAlerts, useNotifications } from "app/contexts/SweetAlertContext"
import { getApiErrorMessage } from "app/api/apiErrors"
import { AccountSettingsForm, PasswordChangeForm } from "app/types/user"

const initialPasswordForm: PasswordChangeForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

const allowedAvatarTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
])
const maxAvatarBytes = 5 * 1024 * 1024

export function useAccountSettings() {
  /* ROUTER HOOKS */
  const navigate = useNavigate()

  /* DOMAIN HOOKS */
  const {
    user,
    logout,
    saveProfile,
    changePassword,
    uploadAvatar,
    removeAvatar,
    profileSaving,
    passwordChanging,
    avatarUploading,
    avatarRemoving,
    logoutPending,
  } = useAuth()
  const { confirmWithLoading } = useAlerts()
  const { notifyError, notifySuccess, notifyWarning } = useNotifications()

  /* STATE */
  const [form, setForm] = useState<AccountSettingsForm>({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    phone: user.phone,
    location: user.location,
  })
  const [passwordForm, setPasswordForm] =
    useState<PasswordChangeForm>(initialPasswordForm)

  /* EFFECTS */
  useEffect(() => {
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      phone: user.phone,
      location: user.location,
    })
  }, [user])

  /* HANDLERS */
  const handleProfileChange =
    (key: keyof AccountSettingsForm) =>
    (event: ChangeEvent<HTMLInputElement>) =>
      setForm(currentForm => ({
        ...currentForm,
        [key]: event.target.value,
      }))

  const handlePasswordFieldChange =
    (key: keyof PasswordChangeForm) => (event: ChangeEvent<HTMLInputElement>) =>
      setPasswordForm(currentForm => ({
        ...currentForm,
        [key]: event.target.value,
      }))

  const handleProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await saveProfile(form)
      await notifySuccess({
        title: "Profile updated",
        message: "Your Cavora travel profile is ready for the next journey.",
      })
    } catch (error) {
      await notifyError({
        title: "Profile update paused",
        message: getApiErrorMessage(
          error,
          "Your details are safe. Please return in a moment.",
        ),
      })
    }
  }

  const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!passwordForm.currentPassword) {
      await notifyWarning({
        title: "Current password required",
        message: "Enter your current password before choosing a new one.",
      })
      return
    }

    if (passwordForm.newPassword.length < 8) {
      await notifyWarning({
        title: "Password is too short",
        message: "Choose a new password with at least 8 characters.",
      })
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      await notifyWarning({
        title: "Passwords do not match",
        message: "Confirm the same new password before saving.",
      })
      return
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      await notifyWarning({
        title: "Choose a different password",
        message: "Your new password must differ from the current password.",
      })
      return
    }

    try {
      const result = await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })
      setPasswordForm(initialPasswordForm)
      await notifySuccess({
        title: "Password updated",
        message: result.message,
      })
    } catch (error) {
      await notifyError({
        title: "Password update paused",
        message: getApiErrorMessage(
          error,
          "Your password remains unchanged. Please return shortly.",
        ),
      })
    }
  }

  const handleAvatarUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget
    const image = input.files?.[0]
    if (!image) return

    if (!allowedAvatarTypes.has(image.type)) {
      input.value = ""
      await notifyWarning({
        title: "Unsupported image",
        message: "Choose a JPEG, PNG, WebP, or AVIF image.",
      })
      return
    }

    if (image.size > maxAvatarBytes) {
      input.value = ""
      await notifyWarning({
        title: "Image is too large",
        message: "Choose an image that is 5 MB or smaller.",
      })
      return
    }

    try {
      await uploadAvatar(image)
      await notifySuccess({
        title: "Photo updated",
        message: "Your new profile photo is now part of your Cavora journey.",
      })
    } catch (error) {
      await notifyError({
        title: "Photo update paused",
        message: getApiErrorMessage(
          error,
          "Your current photo is still safe. Please return shortly.",
        ),
      })
    } finally {
      input.value = ""
    }
  }

  const handleAvatarRemove = async () => {
    let removalSucceeded = true
    const confirmed = await confirmWithLoading({
      message: "Do you want to remove your profile photo?",
      confirmText: "Remove",
      cancelText: "Keep photo",
      loadingMs: 700,
      onConfirm: async () => {
        try {
          await removeAvatar()
        } catch {
          removalSucceeded = false
        }
      },
    })

    if (!confirmed) return
    if (removalSucceeded) {
      await notifySuccess({
        title: "Photo removed",
        message: "Your default Cavora profile photo is active again.",
      })
      return
    }

    await notifyError({
      title: "Photo removal paused",
      message: "Your current photo remains unchanged. Please return shortly.",
    })
  }

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      navigate("/login")
    }
  }

  return {
    user,
    form,
    passwordForm,
    handleProfileChange,
    handlePasswordFieldChange,
    handleProfileSubmit,
    handlePasswordSubmit,
    handleAvatarUpload,
    handleAvatarRemove,
    handleLogout,
    profileSaving,
    passwordChanging,
    avatarUploading,
    avatarRemoving,
    logoutPending,
  }
}
