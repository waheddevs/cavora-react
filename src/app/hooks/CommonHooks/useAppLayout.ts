import { useLocation } from "react-router-dom"

interface AppLayoutState {
  pathname: string
  isAuthRoute: boolean
}

export function useAppLayout(): AppLayoutState {
  const { pathname } = useLocation()

  const authRoutes = [
    "/login",
    "/signup",
    "/payment",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
  ]

  return {
    pathname,
    isAuthRoute: authRoutes.includes(pathname),
  }
}
