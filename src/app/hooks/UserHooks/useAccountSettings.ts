import { ChangeEvent, FormEvent, useState } from "react"
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
  const navigate = useNavigate()
  const { user, logout, saveProfile } = useAuth()
  const [form, setForm] = useState<AccountSettingsForm>({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    phone: user.phone,
    location: user.location,
  })

  const handleChange =
    (key: keyof AccountSettingsForm) =>
    (event: ChangeEvent<HTMLInputElement>) =>
      setForm(currentForm => ({
        ...currentForm,
        [key]: event.target.value,
      }))

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    saveProfile(form)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return { form, handleChange, handleSubmit, handleLogout }
}
