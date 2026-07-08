import { Box, Container, Stack, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import GoldButton from "../ui/GoldButton"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"

export default function AboutNavbar() {
  const authMember = null
  return (
    <>
      <div className="about-navbar">
        <Container maxWidth={false} className="navbar-container">
          <Stack className="menu">
            <Box className="logo">
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
      </div>

      {/* Page header / breadcrumb */}
      <div className="page-hero">
        <Typography className="page-hero-tagline">Who We Are</Typography>
        <Typography className="page-hero-title">About Us</Typography>
        <Box className="page-hero-crumb">
          <NavLink to={"/"} className="crumb-link">
            Home
          </NavLink>
          <ChevronRightRoundedIcon className="crumb-sep" />
          <span className="crumb-current">About Us</span>
        </Box>
      </div>
    </>
  )
}
