import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import NavbarPanel from "./NavbarPanel"

export default function AboutNavbar() {
  return (
    <>
      <div className="about-navbar">
        <NavbarPanel />
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
