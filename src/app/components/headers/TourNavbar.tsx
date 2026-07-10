import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import NavbarPanel from "./NavbarPanel"

export default function TourNavbar() {
  return (
    <>
      <div className="tour-navbar">
        <NavbarPanel />
      </div>

      {/* Page header / breadcrumb */}
      <div className="page-hero tour-hero">
        <Typography className="page-hero-tagline">Explore The World</Typography>
        <Typography className="page-hero-title">Listing Tours</Typography>
        <Box className="page-hero-crumb">
          <NavLink to={"/"} className="crumb-link">
            Home
          </NavLink>
          <ChevronRightRoundedIcon className="crumb-sep" />
          <span className="crumb-current">Tour List</span>
        </Box>
      </div>
    </>
  )
}
