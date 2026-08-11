import { CheckoutProvider } from "app/contexts/CheckoutContext"
import PaymentPage from "."

export default function PaymentRoute() {
  return (
    <CheckoutProvider>
      <PaymentPage />
    </CheckoutProvider>
  )
}
