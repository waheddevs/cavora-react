import { ChangeEvent, FormEvent, useState } from "react"
import { useForgotPasswordMutation } from "app/api/authApi"
import { getApiErrorMessage } from "app/api/apiErrors"
import { useNotifications } from "app/contexts/SweetAlertContext"

export function useForgotPassword() {
  /* STATE */
  const [email, setEmail] = useState("")
  const [resultMessage, setResultMessage] = useState("")

  /* API HOOKS */
  const [forgotPassword, forgotState] = useForgotPasswordMutation()

  /* DOMAIN HOOKS */
  const { notifyError, notifySuccess } = useNotifications()

  /* HANDLERS */
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const result = await forgotPassword({ email }).unwrap()
      setResultMessage(result.message)
      await notifySuccess({
        title: "Request received",
        message: "Check your inbox for the next step.",
      })
    } catch (error) {
      await notifyError({
        title: "Request paused",
        message: getApiErrorMessage(
          error,
          "The recovery request could not be prepared. Please return shortly.",
        ),
      })
    }
  }

  return {
    email,
    resultMessage,
    isSubmitting: forgotState.isLoading,
    handleEmailChange,
    handleSubmit,
  }
}
