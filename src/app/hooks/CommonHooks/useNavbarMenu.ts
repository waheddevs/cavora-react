import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

interface NavbarMenuState {
  menuOpen: boolean
  closeMenu: () => void
  toggleMenu: () => void
}

export function useNavbarMenu(): NavbarMenuState {
  const { pathname } = useLocation()
  const [menuState, setMenuState] = useState({ pathname, open: false })
  const menuOpen = menuState.pathname === pathname && menuState.open

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuState({ pathname, open: false })
      }
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [menuOpen, pathname])

  const closeMenu = () => setMenuState({ pathname, open: false })
  const toggleMenu = () =>
    setMenuState(current => ({
      pathname,
      open: current.pathname === pathname ? !current.open : true,
    }))

  return { menuOpen, closeMenu, toggleMenu }
}
