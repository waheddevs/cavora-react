import { Box, Typography } from "@mui/material"
import LockRoundedIcon from "@mui/icons-material/LockRounded"
import { useCheckout } from "app/hooks/PaymentHooks/useCheckout"

export default function PaymentForm() {
  const {
    cardholder,
    cardNumber,
    expiry,
    cvv,
    errors,
    loading,
    success,
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
              onChange={handleCardholderChange}
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
                onChange={handleCardNumberChange}
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
                onChange={handleExpiryChange}
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
                onChange={handleCvvChange}
                disabled={loading || success}
                maxLength={4}
              />
              {errors.cvv && <span className="field-error">{errors.cvv}</span>}
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
  )
}
