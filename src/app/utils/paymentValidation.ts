import { CardBrand, PaymentErrors, PaymentValues } from "app/types/payment"

export const detectCardBrand = (digits: string): CardBrand => {
  if (/^4/.test(digits)) return "visa"
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "mastercard"
  if (/^3[47]/.test(digits)) return "amex"
  return "unknown"
}

/* "4111111111111111" -> "4111 1111 1111 1111" */
export const formatCardNumber = (raw: string): string =>
  raw
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim()

/* "0928" -> "09/28" */
export const formatExpiry = (raw: string): string => {
  const digits = raw.replace(/\D/g, "").slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

function expiryError(expiry: string): string | undefined {
  if (!expiry) return "Expiry date is required"

  const match = /^(\d{2})\/(\d{2})$/.exec(expiry)
  if (!match) return "Use MM/YY format"

  const month = Number(match[1])
  const year = Number(match[2])
  if (month < 1 || month > 12) return "Enter a valid month"

  const now = new Date()
  const currentYear = now.getFullYear() % 100
  const currentMonth = now.getMonth() + 1
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return "Card has expired"
  }

  return undefined
}

export function validatePayment({
  cardholder,
  cardNumber,
  expiry,
  cvv,
}: PaymentValues): PaymentErrors {
  const errors: PaymentErrors = {}
  const digits = cardNumber.replace(/\D/g, "")

  if (!cardholder.trim()) errors.cardholder = "Cardholder name is required"
  else if (!/^[a-zA-Z\s'-]{2,}$/.test(cardholder.trim()))
    errors.cardholder = "Enter the name as it appears on the card"

  if (!digits) errors.cardNumber = "Card number is required"
  else if (digits.length !== 16)
    errors.cardNumber = "Card number must be 16 digits"

  const expiryMessage = expiryError(expiry)
  if (expiryMessage) errors.expiry = expiryMessage

  if (!cvv) errors.cvv = "CVV is required"
  else if (!/^\d{3,4}$/.test(cvv)) errors.cvv = "CVV must be 3–4 digits"

  return errors
}
