import { ReactNode } from "react"
import { useAuthState } from "app/hooks/AuthHooks/useAuthState"
import { AuthContext } from "./authContext"

export default function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthState()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
