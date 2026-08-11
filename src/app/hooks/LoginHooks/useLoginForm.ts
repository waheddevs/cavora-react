import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoginErrors, validateLogin } from "app/utils/loginValidation"
import { useAuth } from "app/hooks/AuthHooks/useAuth"
import { getApiErrorMessage } from "app/api/apiErrors"

export function useLoginForm() {
  /* ROUTER HOOKS */
  const navigate = useNavigate()

  /* DOMAIN HOOKS */
  const { login, loginPending } = useAuth()

  /* STATE */
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<LoginErrors>({})
  const [submitError, setSubmitError] = useState("")

  /* HANDLERS */
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value)
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value)
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const nextErrors = validateLogin({ email, password })
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      try {
        setSubmitError("")
        await login(email, password)
        navigate("/user")
      } catch (error) {
        setSubmitError(
          getApiErrorMessage(
            error,
            "We could not open your travel account right now. Please return shortly.",
          ),
        )
      }
    }
  }

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    errors,
    submitError,
    isSubmitting: loginPending,
    handleSubmit,
  }
}
