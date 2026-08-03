import { useEffect, useMemo, useState } from "react"
import { Box, Typography } from "@mui/material"
import { NavLink, useNavigate, useSearchParams } from "react-router-dom"
import moment from "moment"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import LockRoundedIcon from "@mui/icons-material/LockRounded"
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import CheckRoundedIcon from "@mui/icons-material/CheckRounded"
import ContactlessRoundedIcon from "@mui/icons-material/ContactlessRounded"
import {
  detectCardBrand,
  formatCardNumber,
  formatExpiry,
  submitPayment,
  validatePayment,
  type PaymentErrors,
} from "ts/Payment"
import { getTourById } from "ts/TourSingle"
import { addBooking } from "ts/User"
import "css/payment.css"

const HOLD_SECONDS = 10 * 60

export default function PaymentPage() {
  /* HOOKS */
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const tourId = params.get("tourId")
  const date = params.get("date") ?? ""
  const guests = Math.max(1, Number(params.get("guests") ?? 1))
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
  const [secondsLeft, setSecondsLeft] = useState(HOLD_SECONDS)

  useEffect(() => {
    if (success) return
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [success])

  if (!tour) {
    return (
      <Box className="payment-page payment-page--empty">
        <Box className="payment-empty-card">
          <CreditCardRoundedIcon />
          <Typography className="payment-empty-title">
            No booking selected
          </Typography>
          <Typography className="payment-empty-text">
            Head back to our tours and pick your next adventure first.
          </Typography>
          <NavLink to="/tour" className="payment-empty-link">
            Browse Tours
          </NavLink>
        </Box>
      </Box>
    )
  }

  const subtotal = tour.price * guests
  const serviceFee = Math.round(subtotal * 0.02)
  const total = subtotal + serviceFee
  const digits = cardNumber.replace(/\D/g, "")
  const brand = detectCardBrand(digits)

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0")
  const ss = String(secondsLeft % 60).padStart(2, "0")

  /* HANDLER */
  const handleClose = () => navigate(`/tour-single?id=${tour.id}`)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading || success) return

    const nextErrors = validatePayment({ cardholder, cardNumber, expiry, cvv })
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setShake(true)
      window.setTimeout(() => setShake(false), 500)
      return
    }

    setLoading(true)
    const result = await submitPayment({ cardholder, cardNumber, expiry, cvv }, total)
    setLoading(false)

    if (result.success) {
      setTransactionId(result.transactionId)
      addBooking(tour, date || moment().format("YYYY-MM-DD"), guests, total)
      setSuccess(true)
      window.setTimeout(() => {
        navigate("/user", { state: { tab: "bookings" } })
      }, 2200)
    }
  }

  return (
    <Box className="payment-page">
      <img
        src={tour.images[0]}
        className="payment-backdrop"
        alt=""
        aria-hidden="true"
      />
      <Box className="payment-backdrop-overlay" />

      <Box className={`payment-shell ${shake ? "shake" : ""}`}>
        <button
          type="button"
          className="payment-close"
          onClick={handleClose}
          aria-label="Close checkout"
        >
          <CloseRoundedIcon />
        </button>

        <Box className="payment-col payment-col--form">
          <Box className="payment-brand">
            <img src="/icons/logo.svg" alt="Cavora" />
            <span>Secure Checkout</span>
          </Box>

          <Box className="payment-panel">
            <Typography className="payment-title">Payment Details</Typography>
            <Typography className="payment-subtitle">
              Enter your card information to confirm this booking.
            </Typography>

            <Box
              component="form"
              className="payment-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <Box className="payment-field">
                <label htmlFor="pay-name">Cardholder Name</label>
                <input
                  id="pay-name"
                  type="text"
                  placeholder="e.g. Amelia Carter"
                  className={errors.cardholder ? "has-error" : ""}
                  value={cardholder}
                  onChange={(e) => {
                    setCardholder(e.target.value)
                    setErrors((p) => ({ ...p, cardholder: undefined }))
                  }}
                  disabled={loading || success}
                />
                {errors.cardholder && (
                  <span className="field-error">{errors.cardholder}</span>
                )}
              </Box>

              <Box className="payment-field">
                <label htmlFor="pay-number">Card Number</label>
                <Box className="payment-input-icon">
                  <input
                    id="pay-number"
                    type="text"
                    inputMode="numeric"
                    placeholder="0000 0000 0000 0000"
                    className={errors.cardNumber ? "has-error" : ""}
                    value={cardNumber}
                    onChange={(e) => {
                      setCardNumber(formatCardNumber(e.target.value))
                      setErrors((p) => ({ ...p, cardNumber: undefined }))
                    }}
                    disabled={loading || success}
                    maxLength={19}
                  />
                  <span className={`card-brand card-brand--${brand}`} />
                </Box>
                {errors.cardNumber && (
                  <span className="field-error">{errors.cardNumber}</span>
                )}
              </Box>

              <Box className="payment-row">
                <Box className="payment-field">
                  <label htmlFor="pay-expiry">Expiry Date</label>
                  <input
                    id="pay-expiry"
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    className={errors.expiry ? "has-error" : ""}
                    value={expiry}
                    onChange={(e) => {
                      setExpiry(formatExpiry(e.target.value))
                      setErrors((p) => ({ ...p, expiry: undefined }))
                    }}
                    disabled={loading || success}
                    maxLength={5}
                  />
                  {errors.expiry && (
                    <span className="field-error">{errors.expiry}</span>
                  )}
                </Box>

                <Box className="payment-field">
                  <label htmlFor="pay-cvv">CVV</label>
                  <input
                    id="pay-cvv"
                    type="password"
                    inputMode="numeric"
                    placeholder="•••"
                    className={errors.cvv ? "has-error" : ""}
                    value={cvv}
                    onChange={(e) => {
                      setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                      setErrors((p) => ({ ...p, cvv: undefined }))
                    }}
                    disabled={loading || success}
                    maxLength={4}
                  />
                  {errors.cvv && (
                    <span className="field-error">{errors.cvv}</span>
                  )}
                </Box>
              </Box>

              <button
                type="submit"
                className={`payment-submit ${loading ? "loading" : ""}`}
                disabled={loading || success}
              >
                {loading ? (
                  <span className="payment-spinner" />
                ) : (
                  <LockRoundedIcon />
                )}
                {loading ? "Processing…" : `Pay $${total.toLocaleString()}`}
              </button>

              <p className="payment-secure-note">
                <LockRoundedIcon />
                Payments are encrypted and processed securely.
              </p>
            </Box>
          </Box>
        </Box>

        <Box className="payment-col payment-col--summary">
          <Box className={`payment-card-visual card-brand--${brand}`}>
            <Box className="pcv-top">
              <ContactlessRoundedIcon className="pcv-wave" />
              <span className={`pcv-chip`} />
            </Box>
            <Box className="pcv-number">
              {(cardNumber || "•••• •••• •••• ••••")
                .padEnd(19, "•")
                .slice(0, 19)}
            </Box>
            <Box className="pcv-bottom">
              <Box>
                <small>Card Holder</small>
                <strong>{cardholder || "Your Name"}</strong>
              </Box>
              <Box>
                <small>Expires</small>
                <strong>{expiry || "MM/YY"}</strong>
              </Box>
              <span className="pcv-logo" />
            </Box>
          </Box>

          <Box className="payment-hold">
            <AccessTimeRoundedIcon />
            Price held for{" "}
            <strong>
              {mm}:{ss}
            </strong>
          </Box>

          <Box className="payment-summary">
            <Box className="payment-summary-tour">
              <img src={tour.images[0]} alt={tour.title} />
              <Box>
                <Typography className="ps-title">{tour.title}</Typography>
                <span className="ps-location">
                  <LocationOnRoundedIcon />
                  {tour.location}
                </span>
              </Box>
            </Box>

            <Box className="payment-summary-meta">
              <span>
                <CalendarMonthRoundedIcon />
                {date ? moment(date).format("DD MMM YYYY") : "Flexible date"}
              </span>
              <span>
                <GroupRoundedIcon />
                {guests} {guests > 1 ? "Guests" : "Guest"}
              </span>
            </Box>

            <Box className="payment-summary-lines">
              <Box className="payment-line">
                <span>Subtotal</span>
                <strong>${subtotal.toLocaleString()}</strong>
              </Box>
              <Box className="payment-line">
                <span>Service Fee</span>
                <strong>${serviceFee.toLocaleString()}</strong>
              </Box>
            </Box>

            <Box className="payment-summary-total">
              <span>Total to Pay</span>
              <strong>${total.toLocaleString()}</strong>
            </Box>
          </Box>
        </Box>

        {success && (
          <Box className="payment-success">
            <Box className="payment-success-circle">
              <CheckRoundedIcon />
            </Box>
            <Typography className="payment-success-title">
              Payment Successful!
            </Typography>
            <Typography className="payment-success-text">
              Your booking for <strong>{tour.title}</strong> is confirmed.
            </Typography>
            <span className="payment-success-tx">Ref: {transactionId}</span>
            <Box className="payment-success-redirect">
              <span className="payment-spinner" />
              Redirecting to My Bookings…
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}
