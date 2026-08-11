import { useLocation } from "react-router-dom"

interface AppLayoutState {
  pathname: string
  isAuthRoute: boolean
}

export function useAppLayout(): AppLayoutState {
  const { pathname } = useLocation()

  return {
    pathname,
    isAuthRoute: ["/login", "/signup", "/payment"].includes(pathname),
  }
}
