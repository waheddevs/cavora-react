import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SignupErrors, validateSignup } from "app/utils/signupValidation"
import { useAuth } from "app/hooks/AuthHooks/useAuth"

export function useSignupForm() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<SignupErrors>({})

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const values = { firstName, lastName, email, username, password }
    const nextErrors = validateSignup(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      signup({ firstName, lastName, email, username })
      navigate("/user")
    }
  }

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    errors,
    handleSubmit,
  }
}
