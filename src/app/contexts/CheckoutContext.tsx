import { ReactNode, createContext } from "react"
import { useCheckoutState } from "app/hooks/PaymentHooks/useCheckoutState"

export type CheckoutContextValue = ReturnType<typeof useCheckoutState>

export const CheckoutContext = createContext<CheckoutContextValue | null>(null)

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const checkout = useCheckoutState()

  return (
    <CheckoutContext.Provider value={checkout}>
      {children}
    </CheckoutContext.Provider>
  )
}
