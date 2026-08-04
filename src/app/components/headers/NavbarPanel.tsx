import { Box, Container, IconButton, Stack } from "@mui/material"
import { NavLink } from "react-router-dom"
import PersonRoundedIcon from "@mui/icons-material/PersonRounded"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import GoldButton from "../ui/GoldButton"
import { useNavbarMenu } from "app/hooks/CommonHooks/useNavbarMenu"
import { useAuth } from "app/hooks/AuthHooks/useAuth"

const navItems = [
  { label: "Home", to: "/", end: true },
  { label: "Tours", to: "/tour" },
  { label: "Blog", to: "/blog" },
  { label: "About Us", to: "/about" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
]

export default function NavbarPanel() {
  const { isAuthenticated } = useAuth()
  const { menuOpen, closeMenu, toggleMenu } = useNavbarMenu()

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
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={toggleMenu}
        >
          {menuOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
        </IconButton>

        <Box
          id="primary-navigation"
          className={`navbar-collapse${menuOpen ? " open" : ""}`}
        >
          <Stack
            component="nav"
            className="links"
            aria-label="Primary navigation"
          >
            {navItems.map(item => (
              <Box key={item.to}>
                <NavLink to={item.to} end={item.end} onClick={closeMenu}>
                  {item.label}
                </NavLink>
              </Box>
            ))}
          </Stack>

          <Box className="btn">
            {isAuthenticated ? (
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
                  component={NavLink}
                  to="/signup"
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
