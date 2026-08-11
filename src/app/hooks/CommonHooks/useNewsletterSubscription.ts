import { ChangeEvent, FormEvent, useState } from "react"
import { useSubscribeToNewsletterMutation } from "app/api/newsletterApi"
import { getApiErrorMessage } from "app/api/apiErrors"
import { useNotifications } from "app/contexts/SweetAlertContext"
import { NewsletterSource } from "app/types/newsletter"

export function useNewsletterSubscription(source: NewsletterSource) {
  /* STATE */
  const [email, setEmail] = useState("")

  /* API HOOKS */
  const [subscribeToNewsletter, subscriptionState] =
    useSubscribeToNewsletterMutation()

  /* DOMAIN HOOKS */
  const { notifyError, notifyInfo, notifySuccess } = useNotifications()

  /* HANDLERS */
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const result = await subscribeToNewsletter({
        email: email.trim(),
        source,
      }).unwrap()

      setEmail("")
      const notification = {
        title: result.subscribed ? "Welcome aboard" : "Already on the list",
        message: result.message,
      }
      if (result.subscribed) await notifySuccess(notification)
      else await notifyInfo(notification)
    } catch (error) {
      await notifyError({
        title: "Subscription paused",
        message: getApiErrorMessage(
          error,
          "We could not save your subscription. Please return shortly.",
        ),
      })
    }
  }

  return {
    email,
    isSubmitting: subscriptionState.isLoading,
    handleEmailChange,
    handleSubmit,
  }
}
