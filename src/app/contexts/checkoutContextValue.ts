import { createContext } from "react"
import { useCheckoutState } from "app/hooks/PaymentHooks/useCheckoutState"

export type CheckoutContextValue = ReturnType<typeof useCheckoutState>

export const CheckoutContext = createContext<CheckoutContextValue | null>(null)
