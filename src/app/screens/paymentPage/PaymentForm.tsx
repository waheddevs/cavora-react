import { Box, Typography } from "@mui/material"
import LockRoundedIcon from "@mui/icons-material/LockRounded"
import { useCheckout } from "app/hooks/PaymentHooks/useCheckout"

export default function PaymentForm() {
  /* HOOKS */
  const {
    cardholder,
    cardNumber,
    expiry,
    cvv,
    loading,
    total,
    brand,
    handleCardholderChange,
    handleCardNumberChange,
    handleExpiryChange,
    handleCvvChange,
    handleSubmit,
  } = useCheckout()

  return (
    <Box className="payment-col payment-col--form">
      <Box className="payment-brand">
        <img src="/icons/logo.svg" alt="Cavora" />
        <span>Demo Checkout</span>
      </Box>

      <Box className="payment-panel">
        <Typography className="payment-title">Payment Details</Typography>
        <Typography className="payment-subtitle">
          This is a demo payment. Any card details will be accepted.
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
              value={cardholder}
              onChange={handleCardholderChange}
              disabled={loading}
            />
          </Box>

          <Box className="payment-field">
            <label htmlFor="pay-number">Card Number</label>
            <Box className="payment-input-icon">
              <input
                id="pay-number"
                type="text"
                inputMode="numeric"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={handleCardNumberChange}
                disabled={loading}
                maxLength={19}
              />
              <span className={`card-brand card-brand--${brand}`} />
            </Box>
          </Box>

          <Box className="payment-row">
            <Box className="payment-field">
              <label htmlFor="pay-expiry">Expiry Date</label>
              <input
                id="pay-expiry"
                type="text"
                inputMode="numeric"
                placeholder="MM/YY"
                value={expiry}
                onChange={handleExpiryChange}
                disabled={loading}
                maxLength={5}
              />
            </Box>

            <Box className="payment-field">
              <label htmlFor="pay-cvv">CVV</label>
              <input
                id="pay-cvv"
                type="password"
                inputMode="numeric"
                placeholder="•••"
                value={cvv}
                onChange={handleCvvChange}
                disabled={loading}
                maxLength={4}
              />
            </Box>
          </Box>

          <button
            type="submit"
            className={`payment-submit ${loading ? "loading" : ""}`}
            disabled={loading}
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
            Demo mode — no real payment will be charged.
          </p>
        </Box>
      </Box>
    </Box>
  )
}
