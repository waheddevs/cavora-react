export type CardBrand = "visa" | "mastercard" | "amex" | "unknown"

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
