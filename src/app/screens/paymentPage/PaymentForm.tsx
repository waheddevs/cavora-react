import { Box, Typography } from "@mui/material"
import { useCheckout } from "app/hooks/PaymentHooks/useCheckout"

export default function PaymentForm() {
  /* HOOKS */
  const {
    cardholder,
    cardNumber,
    expiry,
    cvv,
    errors,
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
        <span>Checkout</span>
      </Box>

      <Box className="payment-panel">
        <Typography className="payment-title">Payment Details</Typography>
        <Typography className="payment-subtitle">
          Enter your card details to complete your booking.
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
              name="ccname"
              type="text"
              autoComplete="cc-name"
              placeholder="e.g. Amelia Carter"
              value={cardholder}
              onChange={handleCardholderChange}
              disabled={loading}
              className={errors.cardholder ? "has-error" : ""}
              aria-invalid={Boolean(errors.cardholder)}
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
                name="cardnumber"
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={handleCardNumberChange}
                disabled={loading}
                maxLength={19}
                className={errors.cardNumber ? "has-error" : ""}
                aria-invalid={Boolean(errors.cardNumber)}
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
                name="cc-exp"
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM/YY"
                value={expiry}
                onChange={handleExpiryChange}
                disabled={loading}
                maxLength={5}
                className={errors.expiry ? "has-error" : ""}
                aria-invalid={Boolean(errors.expiry)}
              />
              {errors.expiry && (
                <span className="field-error">{errors.expiry}</span>
              )}
            </Box>

            <Box className="payment-field">
              <label htmlFor="pay-cvv">CVV</label>
              <input
                id="pay-cvv"
                name="cvc"
                type="password"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="•••"
                value={cvv}
                onChange={handleCvvChange}
                disabled={loading}
                maxLength={3}
                className={errors.cvv ? "has-error" : ""}
                aria-invalid={Boolean(errors.cvv)}
              />
              {errors.cvv && <span className="field-error">{errors.cvv}</span>}
            </Box>
          </Box>

          <button
            type="submit"
            className={`payment-submit ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading && <span className="payment-spinner" />}
            {loading ? "Processing…" : `Pay $${total.toLocaleString()}`}
          </button>
        </Box>
      </Box>
    </Box>
  )
}
