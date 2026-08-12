import { useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"

export function useScrollToTop(): void {
  const { pathname, search } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [pathname, search])
}
