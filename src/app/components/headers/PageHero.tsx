import { Fragment } from "react"
import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import NavbarPanel from "./NavbarPanel"

/* One breadcrumb segment after "Home".
   `to` present → clickable link; absent → the current (last) page. */
export interface Crumb {
  label: string
  to?: string
}

export interface PageHeroProps {
  /* wrapper class for the top navbar bar, e.g. "about-navbar" */
  navbarClass: string
  /* optional page-hero modifier class, e.g. "faq-hero" */
  heroClass?: string
  tagline: string
  title: string
  /* breadcrumb trail after the fixed "Home" link */
  crumbs: Crumb[]
}

/* Shared page header used by every inner page (About, Blog, Tour, …).
   Replaces the 7 near-identical per-page navbar components. */
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

      {/* Page header / breadcrumb */}
      <Box className={heroClass ? `page-hero ${heroClass}` : "page-hero"}>
        <Typography className="page-hero-tagline">{tagline}</Typography>
        <Typography className="page-hero-title">{title}</Typography>
        <Box className="page-hero-crumb">
          <NavLink to="/" className="crumb-link">
            Home
          </NavLink>
          {crumbs.map((crumb) => (
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
