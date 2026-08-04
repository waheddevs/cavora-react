import { useLocation } from "react-router-dom"

export interface AppLayoutState {
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
