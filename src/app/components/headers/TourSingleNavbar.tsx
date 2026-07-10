import { Box, Typography } from "@mui/material"
import { NavLink, useSearchParams } from "react-router-dom"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import NavbarPanel from "./NavbarPanel"
import { getTourById } from "../../../js/TourSingle"

export default function TourSingleNavbar() {
  const [params] = useSearchParams()
  const tour = getTourById(params.get("id") ?? 1)

  return (
    <>
      <div className="tour-single-navbar">
        <NavbarPanel />
      </div>

      <div className="page-hero tour-single-hero">
        <Typography className="page-hero-tagline">Adventure Awaits</Typography>
        <Typography className="page-hero-title">
          {tour ? tour.title : "Tour"}
        </Typography>
        <Box className="page-hero-crumb">
          <NavLink to={"/"} className="crumb-link">
            Home
          </NavLink>
          <ChevronRightRoundedIcon className="crumb-sep" />
          <NavLink to={"/tour"} className="crumb-link">
            Tour List
          </NavLink>
          <ChevronRightRoundedIcon className="crumb-sep" />
          <span className="crumb-current">{tour ? tour.title : "Details"}</span>
        </Box>
      </div>
    </>
  )
}
