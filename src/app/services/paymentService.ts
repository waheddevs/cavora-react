import { PaymentValues } from "app/utils/paymentValidation"

export interface PaymentResult {
  success: boolean
  transactionId: string
}

export function submitPayment(
  _values: PaymentValues,
  amount: number,
): Promise<PaymentResult> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: `CV-${Date.now().toString(36).toUpperCase()}-${Math.round(amount)}`,
      })
    }, 1600)
  })
}
