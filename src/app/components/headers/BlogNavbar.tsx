import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import NavbarPanel from "./NavbarPanel"

export default function BlogNavbar() {
  return (
    <>
      <div className="blog-navbar">
        <NavbarPanel />
      </div>

      {/* Page header / breadcrumb */}
      <div className="page-hero blog-hero">
        <Typography className="page-hero-tagline">Travel Stories</Typography>
        <Typography className="page-hero-title">Blog List</Typography>
        <Box className="page-hero-crumb">
          <NavLink to={"/"} className="crumb-link">
            Home
          </NavLink>
          <ChevronRightRoundedIcon className="crumb-sep" />
          <span className="crumb-current">Blog</span>
        </Box>
      </div>
    </>
  )
}
