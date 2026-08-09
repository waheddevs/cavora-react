import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "app/hooks/AuthHooks/useAuth"

export interface AccountSettingsForm {
  firstName: string
  lastName: string
  email: string
  username: string
  phone: string
  location: string
}

export function useAccountSettings() {
  /* ROUTER HOOKS */
  const navigate = useNavigate()

  /* DOMAIN HOOKS */
  const { user, logout, saveProfile, profileSaving, logoutPending } = useAuth()

  /* STATE */
  const [form, setForm] = useState<AccountSettingsForm>({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    phone: user.phone,
    location: user.location,
  })
  const [status, setStatus] = useState("")

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
      setStatus("")
      await saveProfile(form)
      setStatus("Profile updated successfully.")
    } catch {
      setStatus("Profile could not be updated.")
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
    status,
    profileSaving,
    logoutPending,
  }
}
