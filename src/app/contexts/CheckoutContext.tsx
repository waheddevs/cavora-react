import { ReactNode } from "react"
import { useCheckoutState } from "app/hooks/PaymentHooks/useCheckoutState"
import { CheckoutContext } from "./checkoutContextValue"

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const checkout = useCheckoutState()

  return (
    <CheckoutContext.Provider value={checkout}>
      {children}
    </CheckoutContext.Provider>
  )
}
