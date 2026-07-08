import { Box, Button, Container, Stack } from "@mui/material"
import { NavLink } from "react-router-dom"
import GoldButton from "../ui/GoldButton"

export default function HomeNavbar() {
  const authMember = null
  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box>
            <NavLink to={"/"}>
              <img
                src="/icons/logo.svg"
                className="brand-logo"
                alt="brand-logo"
              />
            </NavLink>
          </Box>

          <Stack className="links">
            <Box>
              <NavLink to={"/"}>Home</NavLink>
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
            <Box>
              <GoldButton>Login</GoldButton>
            </Box>
          </Stack>
        </Stack>
        
      </Container>
    </div>
  )
}
