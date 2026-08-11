import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "app/hooks/AuthHooks/useAuth"
import { useNotifications } from "app/contexts/SweetAlertContext"
import { AccountSettingsForm } from "app/types/user"

export function useAccountSettings() {
  /* ROUTER HOOKS */
  const navigate = useNavigate()

  /* DOMAIN HOOKS */
  const { user, logout, saveProfile, profileSaving, logoutPending } = useAuth()
  const { notifyError, notifySuccess } = useNotifications()

  /* STATE */
  const [form, setForm] = useState<AccountSettingsForm>({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    phone: user.phone,
    location: user.location,
  })

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
  const handleChange =
    (key: keyof AccountSettingsForm) =>
    (event: ChangeEvent<HTMLInputElement>) =>
      setForm(currentForm => ({
        ...currentForm,
        [key]: event.target.value,
      }))

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await saveProfile(form)
      await notifySuccess({
        title: "Profile updated",
        message: "Your Cavora travel profile is ready for the next journey.",
      })
    } catch {
      await notifyError({
        title: "Profile update paused",
        message: "Your details are safe. Please return in a moment.",
      })
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      navigate("/login")
    }
  }

  return {
    form,
    handleChange,
    handleSubmit,
    handleLogout,
    profileSaving,
    logoutPending,
  }
}
