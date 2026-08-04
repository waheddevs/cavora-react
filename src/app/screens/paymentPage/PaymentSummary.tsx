import { Box, Typography } from "@mui/material"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import ContactlessRoundedIcon from "@mui/icons-material/ContactlessRounded"
import { useCheckout } from "app/hooks/PaymentHooks/useCheckout"

export default function PaymentSummary() {
  const {
    tour,
    guests,
    cardholder,
    cardNumber,
    expiry,
    subtotal,
    serviceFee,
    total,
    brand,
    formattedDate,
    minutesLeft,
    secondsRemaining,
  } = useCheckout()
  if (!tour) return null

  return (
    <Box className="payment-col payment-col--summary">
      <Box className={`payment-card-visual card-brand--${brand}`}>
        <Box className="pcv-top">
          <ContactlessRoundedIcon className="pcv-wave" />
          <span className="pcv-chip" />
        </Box>
        <Box className="pcv-number">
          {(cardNumber || "•••• •••• •••• ••••").padEnd(19, "•").slice(0, 19)}
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
          {minutesLeft}:{secondsRemaining}
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
            {formattedDate}
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
  )
}
