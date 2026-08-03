import { useEffect, useState } from "react"
import { Box, Container, IconButton, Stack } from "@mui/material"
import { NavLink, useLocation } from "react-router-dom"
import PersonRoundedIcon from "@mui/icons-material/PersonRounded"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import GoldButton from "../ui/GoldButton"

const navItems = [
  { label: "Home", to: "/", end: true },
  { label: "Tours", to: "/tour" },
  { label: "Blog", to: "/blog" },
  { label: "About Us", to: "/about" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
]

/** Shared navigation used by every page header. */
export default function NavbarPanel() {
  const authMember = null
  /* HOOKS */
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

  /* HANDLER */
  const closeMenu = () => setMenuOpen(false)

  return (
    <Container maxWidth={false} disableGutters className="navbar-container">
      <Stack className="menu">
        <Box className="logo">
          <NavLink to="/" onClick={closeMenu}>
            <img src="/icons/logo.svg" className="brand-logo" alt="Cavora" />
          </NavLink>
        </Box>

        <IconButton
          className="mobile-menu-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
        </IconButton>

        <Box
          id="primary-navigation"
          className={`navbar-collapse${menuOpen ? " open" : ""}`}
        >
          <Stack component="nav" className="links" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Box key={item.to}>
                <NavLink to={item.to} end={item.end} onClick={closeMenu}>
                  {item.label}
                </NavLink>
              </Box>
            ))}
          </Stack>

          <Box className="btn">
            {authMember ? (
              <NavLink
                to="/user"
                className="navbar-user-icon"
                aria-label="My account"
                onClick={closeMenu}
              >
                <PersonRoundedIcon />
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="navbar-login-link"
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
                <GoldButton
                  className="login-btn"
                  onClick={closeMenu}
                  {...({ component: NavLink, to: "/signup" } as object)}
                >
                  Sign up
                </GoldButton>
              </>
            )}
          </Box>
        </Box>
      </Stack>
    </Container>
  )
}
