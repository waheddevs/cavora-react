import { Box, Container, Stack } from "@mui/material"
import { NavLink } from "react-router-dom"
import GoldButton from "../ui/GoldButton"

/**
 * Shared navbar panel (logo, nav links, login button).
 * Rendered inside each page's navbar wrapper (home-navbar, about-navbar, ...).
 */
export default function NavbarPanel() {
  const authMember = null
  return (
    <Container maxWidth={false} disableGutters className="navbar-container">
      <Stack className="menu">
        <Box className="logo">
          <NavLink to={"/"}>
            <img src="/icons/logo.svg" className="brand-logo" alt="brand-logo" />
          </NavLink>
        </Box>

        <Stack className="links">
          <Box>
            <NavLink to={"/"} end>
              Home
            </NavLink>
          </Box>
          <Box>
            <NavLink to={"/about"}>About Us</NavLink>
          </Box>
          <Box>
            <NavLink to={"/tour"}>Tours</NavLink>
          </Box>
          <Box>
            <NavLink to={"/blog"}>Blog</NavLink>
          </Box>
          {authMember ? (
            <Box>
              <NavLink to={"/user"}>My Page</NavLink>
            </Box>
          ) : null}
          <Box>
            <NavLink to={"/faq"}>FAQ</NavLink>
          </Box>
          <Box>
            <NavLink to={"/contact"}>Contact</NavLink>
          </Box>
        </Stack>

        <Box className="btn">
          <GoldButton className="login-btn">Login</GoldButton>
        </Box>
      </Stack>
    </Container>
  )
}
