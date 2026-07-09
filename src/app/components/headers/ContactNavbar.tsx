import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import NavbarPanel from "./NavbarPanel"

export default function ContactNavbar() {
  return (
    <>
      <div className="contact-navbar">
        <NavbarPanel />
      </div>

      {/* Page header / breadcrumb */}
      <div className="page-hero contact-hero">
        <Typography className="page-hero-tagline">Get in Touch</Typography>
        <Typography className="page-hero-title">Contact us</Typography>
        <Box className="page-hero-crumb">
          <NavLink to={"/"} className="crumb-link">
            Home
          </NavLink>
          <ChevronRightRoundedIcon className="crumb-sep" />
          <span className="crumb-current">Contact us</span>
        </Box>
      </div>
    </>
  )
}
