import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded"

export default function PaymentEmptyState() {
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
