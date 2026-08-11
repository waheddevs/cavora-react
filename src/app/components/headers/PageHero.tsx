import { Fragment } from "react"
import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import NavbarPanel from "./NavbarPanel"
import { PageHeroProps } from "app/types/layout"

export default function PageHero({
  navbarClass,
  heroClass,
  tagline,
  title,
  crumbs,
}: PageHeroProps) {
  return (
    <>
      <Box className={navbarClass}>
        <NavbarPanel />
      </Box>

      <Box className={heroClass ? `page-hero ${heroClass}` : "page-hero"}>
        <Typography className="page-hero-tagline">{tagline}</Typography>
        <Typography className="page-hero-title">{title}</Typography>
        <Box className="page-hero-crumb">
          <NavLink to="/" className="crumb-link">
            Home
          </NavLink>
          {crumbs.map(crumb => (
            <Fragment key={crumb.label}>
              <ChevronRightRoundedIcon className="crumb-sep" />
              {crumb.to ? (
                <NavLink to={crumb.to} className="crumb-link">
                  {crumb.label}
                </NavLink>
              ) : (
                <span className="crumb-current">{crumb.label}</span>
              )}
            </Fragment>
          ))}
        </Box>
      </Box>
    </>
  )
}
