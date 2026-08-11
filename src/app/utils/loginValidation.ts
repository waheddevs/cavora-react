import { LoginErrors, LoginValues } from "app/types/auth"

const isEmail = (v: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

export function validateLogin({ email, password }: LoginValues): LoginErrors {
  const errors: LoginErrors = {}

  if (!email.trim()) errors.email = "Email is required"
  else if (!isEmail(email)) errors.email = "Enter a valid email address"

  if (!password) errors.password = "Password is required"

  return errors
}
