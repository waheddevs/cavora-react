import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoginErrors, validateLogin } from "app/utils/loginValidation"
import { useAuth } from "app/hooks/AuthHooks/useAuth"

export function useLoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<LoginErrors>({})

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const nextErrors = validateLogin({ email, password })
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      login(email)
      navigate("/user")
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    handleSubmit,
  }
}
