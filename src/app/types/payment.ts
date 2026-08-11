export type CardBrand = "visa" | "mastercard" | "amex" | "unknown"

export interface PaymentValues {
  cardholder: string
  cardNumber: string
  expiry: string
  cvv: string
}

export type PaymentErrors = Partial<Record<keyof PaymentValues, string>>
