import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SignupErrors, validateSignup } from "app/utils/signupValidation"
import { useAuth } from "app/hooks/AuthHooks/useAuth"
import { getApiErrorMessage } from "app/api/apiErrors"

export function useSignupForm() {
  /* ROUTER HOOKS */
  const navigate = useNavigate()

  /* DOMAIN HOOKS */
  const { signup, signupPending } = useAuth()

  /* STATE */
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<SignupErrors>({})
  const [submitError, setSubmitError] = useState("")

  /* HANDLERS */
  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    setFirstName(event.target.value)
  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    setLastName(event.target.value)
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value)
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value)
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value)
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const values = { firstName, lastName, email, username, password }
    const nextErrors = validateSignup(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      try {
        setSubmitError("")
        await signup({ firstName, lastName, email, username, password })
        navigate("/user")
      } catch (error) {
        setSubmitError(
          getApiErrorMessage(
            error,
            "Your Cavora account could not be prepared right now. Please return shortly.",
          ),
        )
      }
    }
  }

  return {
    firstName,
    lastName,
    email,
    username,
    password,
    handleFirstNameChange,
    handleLastNameChange,
    handleEmailChange,
    handleUsernameChange,
    handlePasswordChange,
    errors,
    submitError,
    isSubmitting: signupPending,
    handleSubmit,
  }
}
