import { useContext } from "react"
import { CheckoutContext } from "app/contexts/CheckoutContext"

export function useCheckout() {
  const checkout = useContext(CheckoutContext)

  if (!checkout) {
    throw new Error("useCheckout requires CheckoutProvider")
  }

  return checkout
}
