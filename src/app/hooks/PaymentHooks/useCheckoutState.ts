import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import moment from "moment"
import {
  PaymentErrors,
  detectCardBrand,
  formatCardNumber,
  formatExpiry,
  validatePayment,
} from "app/utils/paymentValidation"
import { submitPayment } from "app/services/paymentService"
import { getTourById } from "app/data/tourData"
import { useBookings } from "app/hooks/CommonHooks/useBookings"

export function useCheckoutState() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { addBooking } = useBookings()
  const tourId = searchParams.get("tourId")
  const date = searchParams.get("date") ?? ""
  const guests = Math.max(1, Number(searchParams.get("guests") ?? 1))
  const tour = useMemo(() => getTourById(tourId ?? ""), [tourId])
  const [cardholder, setCardholder] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [errors, setErrors] = useState<PaymentErrors>({})
  const [shake, setShake] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [transactionId, setTransactionId] = useState("")
  const [secondsLeft, setSecondsLeft] = useState(10 * 60)
  const subtotal = (tour?.price ?? 0) * guests
  const serviceFee = Math.round(subtotal * 0.02)
  const total = subtotal + serviceFee
  const brand = detectCardBrand(cardNumber.replace(/\D/g, ""))
  const formattedDate = date
    ? moment(date).format("DD MMM YYYY")
    : "Flexible date"
  const minutesLeft = String(Math.floor(secondsLeft / 60)).padStart(2, "0")
  const secondsRemaining = String(secondsLeft % 60).padStart(2, "0")

  useEffect(() => {
    if (success) return

    const timer = setInterval(() => {
      setSecondsLeft(seconds => (seconds > 0 ? seconds - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [success])

  const clearError = (field: keyof PaymentErrors) => {
    setErrors(currentErrors => ({
      ...currentErrors,
      [field]: undefined,
    }))
  }
  const handleCardholderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCardholder(event.target.value)
    clearError("cardholder")
  }
  const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(event.target.value))
    clearError("cardNumber")
  }
  const handleExpiryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpiry(formatExpiry(event.target.value))
    clearError("expiry")
  }
  const handleCvvChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCvv(event.target.value.replace(/\D/g, "").slice(0, 4))
    clearError("cvv")
  }
  const handleClose = () => {
    if (tour) navigate(`/tour-single?id=${tour.id}`)
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!tour || loading || success) return

    const values = { cardholder, cardNumber, expiry, cvv }
    const nextErrors = validatePayment(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setShake(true)
      window.setTimeout(() => setShake(false), 500)
      return
    }

    setLoading(true)
    const result = await submitPayment(values, total)
    setLoading(false)

    if (result.success) {
      setTransactionId(result.transactionId)
      addBooking(
        tour.id,
        moment(date || undefined).format("MMM DD, YYYY"),
        guests,
        total,
      )
      setSuccess(true)
      window.setTimeout(() => {
        navigate("/user", { state: { tab: "bookings" } })
      }, 2200)
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
    success,
    transactionId,
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
