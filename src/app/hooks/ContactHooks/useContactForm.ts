import { ChangeEvent, FormEvent, useState } from "react"
import { useSubmitContactMessageMutation } from "app/api/contactApi"
import { getApiErrorMessage } from "app/api/apiErrors"
import { useNotifications } from "app/hooks/CommonHooks/useSweetAlert"
import { ContactFormValues } from "app/types/contact"

const initialValues: ContactFormValues = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
}

export function useContactForm() {
  /* STATE */
  const [values, setValues] = useState<ContactFormValues>(initialValues)

  /* API HOOKS */
  const [submitContactMessage, submitState] = useSubmitContactMessageMutation()

  /* DOMAIN HOOKS */
  const { notifyError, notifySuccess } = useNotifications()

  /* HANDLERS */
  const handleFieldChange =
    (field: keyof ContactFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues(currentValues => ({
        ...currentValues,
        [field]: event.target.value,
      }))
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const result = await submitContactMessage({
        ...values,
        phone: values.phone.trim() || undefined,
      }).unwrap()

      setValues(initialValues)
      await notifySuccess({
        title: "Message received",
        message: result.message,
      })
    } catch (error) {
      await notifyError({
        title: "Message paused",
        message: getApiErrorMessage(
          error,
          "Your message could not begin its journey. Please return shortly.",
        ),
      })
    }
  }

  return {
    values,
    isSubmitting: submitState.isLoading,
    handleFieldChange,
    handleSubmit,
  }
}
