import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import moment from "moment"
import {
  detectCardBrand,
  formatCardNumber,
  formatExpiry,
  // validatePayment,
} from "app/utils/paymentValidation"
import { PaymentErrors, PaymentValues } from "app/types/payment"
import { getTourById } from "app/data/tourData"
import { useBookings } from "app/hooks/CommonHooks/useBookings"
import { useAlerts } from "app/contexts/SweetAlertContext"

export function useCheckoutState() {
  /* ROUTER HOOKS */
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  /* DOMAIN HOOKS */
  const { addBooking } = useBookings()
  const { confirmWithLoading } = useAlerts()

  /* ROUTE DATA */
  const tourId = searchParams.get("tourId")
  const date = searchParams.get("date") ?? ""
  const guests = Math.max(1, Number(searchParams.get("guests") ?? 1))
  const tour = useMemo(() => getTourById(tourId ?? ""), [tourId])

  /* STATE */
  const [cardholder, setCardholder] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [errors, setErrors] = useState<PaymentErrors>({})
  const [shake, setShake] = useState(false)
  const [loading, setLoading] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(10 * 60)

  /* DERIVED DATA */
  const subtotal = (tour?.price ?? 0) * guests
  const serviceFee = Math.round(subtotal * 0.02)
  const total = subtotal + serviceFee
  const brand = detectCardBrand(cardNumber.replace(/\D/g, ""))
  const formattedDate = date
    ? moment(date).format("DD MMM YYYY")
    : "Flexible date"
  const minutesLeft = String(Math.floor(secondsLeft / 60)).padStart(2, "0")
  const secondsRemaining = String(secondsLeft % 60).padStart(2, "0")

  /* EFFECTS */
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft(seconds => (seconds > 0 ? seconds - 1 : 0))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  /* HANDLERS */
  const clearFieldError = (field: keyof PaymentValues) =>
    setErrors(currentErrors => {
      if (!currentErrors[field]) return currentErrors

      const { [field]: _cleared, ...rest } = currentErrors
      return rest
    })

  const handleCardholderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCardholder(event.target.value)
    clearFieldError("cardholder")
  }

  const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(event.target.value))
    clearFieldError("cardNumber")
  }

  const handleExpiryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpiry(formatExpiry(event.target.value))
    clearFieldError("expiry")
  }

  const handleCvvChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCvv(event.target.value.replace(/\D/g, "").slice(0, 3))
    clearFieldError("cvv")
  }

  const handleClose = () => {
    if (tour) navigate(`/tour-single?id=${tour.id}`)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!tour || loading) return

    /* TEMPORARILY DISABLED — card validation is off so the checkout flow can be
       walked through with an empty form. Restore before shipping. */
    // const nextErrors = validatePayment({ cardholder, cardNumber, expiry, cvv })
    // setErrors(nextErrors)
    //
    // if (Object.keys(nextErrors).length > 0) {
    //   setShake(true)
    //   window.setTimeout(() => setShake(false), 500)
    //   return
    // }

    setLoading(true)
    const confirmed = await confirmWithLoading({
      message: "Do you want to proceed the payment?",
      loadingMs: 3000,
      onConfirm: async () => {
        await addBooking(
          tour.id,
          moment(date || undefined).format("MMM DD, YYYY"),
          guests,
          total,
        )
      },
    })
    setLoading(false)

    if (confirmed) {
      navigate("/user", { replace: true, state: { tab: "bookings" } })
    }
  }

  return {
    tour,
    guests,
    cardholder,
    cardNumber,
    expiry,
    cvv,
    errors,
    shake,
    loading,
    subtotal,
    serviceFee,
    total,
    brand,
    formattedDate,
    minutesLeft,
    secondsRemaining,
    handleCardholderChange,
    handleCardNumberChange,
    handleExpiryChange,
    handleCvvChange,
    handleClose,
    handleSubmit,
  }
}
