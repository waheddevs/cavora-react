import { createContext } from "react"
import { useAuthState } from "app/hooks/AuthHooks/useAuthState"

export type AuthContextValue = ReturnType<typeof useAuthState>

export const AuthContext = createContext<AuthContextValue | null>(null)
