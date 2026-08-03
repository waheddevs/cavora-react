import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * Scrolls the window back to the top on every route change.
 * React Router keeps the previous scroll position when navigating,
 * so without this a new page opens mid-scroll.
 */
export default function ScrollToTop() {
  /* HOOKS */
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname, search])

  return null
}
