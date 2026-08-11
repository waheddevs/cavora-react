import { SignupErrors, SignupValues } from "app/types/auth"

const isEmail = (v: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

export function validateSignup(values: SignupValues): SignupErrors {
  const { firstName, lastName, email, username, password } = values
  const errors: SignupErrors = {}

  if (!firstName.trim()) errors.firstName = "First name is required"
  if (!lastName.trim()) errors.lastName = "Last name is required"

  if (!email.trim()) errors.email = "Email is required"
  else if (!isEmail(email)) errors.email = "Enter a valid email address"

  if (!username.trim()) errors.username = "Username is required"
  else if (!/^[A-Za-z0-9_]+$/.test(username))
    errors.username = "Only letters, numbers and underscores"

  if (!password) errors.password = "Password is required"
  else if (password.length < 8)
    errors.password = "Password must be at least 8 characters"

  return errors
}
