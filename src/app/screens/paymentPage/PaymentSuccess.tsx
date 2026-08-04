import { Box, Typography } from "@mui/material"
import CheckRoundedIcon from "@mui/icons-material/CheckRounded"
import { useCheckout } from "app/hooks/PaymentHooks/useCheckout"

export default function PaymentSuccess() {
  const { tour, success, transactionId } = useCheckout()
  if (!tour || !success) return null

  return (
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
  )
}
