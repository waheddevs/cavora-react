import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useResetPasswordMutation } from "app/api/authApi"
import { getApiErrorMessage } from "app/api/apiErrors"
import { useNotifications } from "app/hooks/CommonHooks/useSweetAlert"
import { ResetPasswordForm } from "app/types/auth"

const initialForm: ResetPasswordForm = {
  password: "",
  confirmPassword: "",
}

export function useResetPassword() {
  /* ROUTER HOOKS */
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  /* STATE */
  const [form, setForm] = useState<ResetPasswordForm>(initialForm)

  /* API HOOKS */
  const [resetPassword, resetState] = useResetPasswordMutation()

  /* DOMAIN HOOKS */
  const { notifyError, notifySuccess, notifyWarning } = useNotifications()

  /* DERIVED DATA */
  const token = searchParams.get("token") ?? ""
  const hasValidToken = token.length >= 40

  /* HANDLERS */
  const handleFieldChange =
    (field: keyof ResetPasswordForm) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setForm(currentForm => ({
        ...currentForm,
        [field]: event.target.value,
      }))
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!hasValidToken) return

    if (form.password.length < 8) {
      await notifyWarning({
        title: "Password is too short",
        message: "Choose a password with at least 8 characters.",
      })
      return
    }

    if (form.password !== form.confirmPassword) {
      await notifyWarning({
        title: "Passwords do not match",
        message: "Confirm the same password before continuing.",
      })
      return
    }

    try {
      const result = await resetPassword({
        token,
        password: form.password,
      }).unwrap()
      setForm(initialForm)
      await notifySuccess({
        title: "Password reset",
        message: result.message,
      })
      navigate("/login", { replace: true })
    } catch (error) {
      await notifyError({
        title: "Reset link unavailable",
        message: getApiErrorMessage(
          error,
          "This reset link may have expired or already been used.",
        ),
      })
    }
  }

  return {
    form,
    hasValidToken,
    isSubmitting: resetState.isLoading,
    handleFieldChange,
    handleSubmit,
  }
}
