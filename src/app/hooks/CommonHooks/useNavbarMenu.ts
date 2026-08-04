import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export interface NavbarMenuState {
  menuOpen: boolean
  closeMenu: () => void
  toggleMenu: () => void
}

export function useNavbarMenu(): NavbarMenuState {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const toggleMenu = () => setMenuOpen(open => !open)

  return { menuOpen, closeMenu, toggleMenu }
}
