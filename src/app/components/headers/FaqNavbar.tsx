import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import NavbarPanel from "./NavbarPanel"

export default function FaqNavbar() {
  return (
    <>
      <div className="faq-navbar">
        <NavbarPanel />
      </div>

      {/* Page header / breadcrumb */}
      <div className="page-hero faq-hero">
        <Typography className="page-hero-tagline">Help Center</Typography>
        <Typography className="page-hero-title">
          Frequently Asked Questions
        </Typography>
        <Box className="page-hero-crumb">
          <NavLink to={"/"} className="crumb-link">
            Home
          </NavLink>
          <ChevronRightRoundedIcon className="crumb-sep" />
          <span className="crumb-current">FAQ</span>
        </Box>
      </div>
    </>
  )
}
