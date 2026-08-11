import { Box } from "@mui/material"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import PaymentEmptyState from "./PaymentEmptyState"
import PaymentForm from "./PaymentForm"
import PaymentSummary from "./PaymentSummary"
import { useCheckout } from "app/hooks/PaymentHooks/useCheckout"
import "css/payment.css"

export default function PaymentPage() {
  const { tour, shake, handleClose } = useCheckout()
  if (!tour) return <PaymentEmptyState />

  return (
    <Box className="payment-page">
      <img
        src={tour.images[0]}
        className="payment-backdrop"
        alt=""
        aria-hidden="true"
      />
      <Box className="payment-backdrop-overlay" />

      <Box className={`payment-shell${shake ? " shake" : ""}`}>
        <button
          type="button"
          className="payment-close"
          onClick={handleClose}
          aria-label="Close checkout"
        >
          <CloseRoundedIcon />
        </button>

        <PaymentForm />
        <PaymentSummary />
      </Box>
    </Box>
  )
}
