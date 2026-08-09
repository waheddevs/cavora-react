import { Box, Container, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import GoldButton from "../ui/GoldButton"
import NavbarPanel from "./NavbarPanel"
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined"
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import { heroFeatures } from "app/data/homeData"
import { useHeroSlider } from "app/hooks/HomeHooks/useHeroSlider"
import { useScrolled } from "app/hooks/HomeHooks/useScrolled"
import { useHomeContent } from "app/hooks/HomeHooks/useHomeContent"

const featureIcons: Record<string, JSX.Element> = {
  verified: <VerifiedOutlinedIcon className="feature-icon" />,
  secure: <ShieldOutlinedIcon className="feature-icon" />,
  curated: <TravelExploreOutlinedIcon className="feature-icon" />,
  support: <SupportAgentOutlinedIcon className="feature-icon" />,
}

export default function HomeNavbar() {
  /* HOOKS */
  const { slides: heroSlides, isLoading, isError } = useHomeContent()
  const { activeSlide } = useHeroSlider(heroSlides.length, 5000)
  const scrolled = useScrolled(40)

  /* DERIVED DATA */
  const active = heroSlides[activeSlide]

  return (
    <>
      <Box className={`home-navbar${scrolled ? " scrolled" : ""}`}>
        <NavbarPanel />
      </Box>
      <Box className="home-hero">
        <Box className="hero-slides">
          {heroSlides.map((slide, slideIndex) => (
            <Box
              key={slide.imageUrl}
              className={`hero-slide${
                slideIndex === activeSlide ? " active" : ""
              }`}
            >
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="hero-slide-img"
              />
            </Box>
          ))}
        </Box>
        <Box className="hero-overlay" />

        <Container maxWidth={false} className="hero-content">
          {active ? (
            <Box className="hero-text" key={activeSlide}>
              <Typography className="hero-location">
                {active.location}
              </Typography>
              <Typography className="hero-title">{active.title}</Typography>
              <Typography className="hero-subtitle">
                {active.subtitle}
              </Typography>
            </Box>
          ) : (
            <Box className="hero-text">
              <Typography className="hero-title">
                {isLoading ? "Loading journeys..." : "Explore the world"}
              </Typography>
              {isError && (
                <Typography className="hero-subtitle">
                  Live travel highlights are temporarily unavailable.
                </Typography>
              )}
            </Box>
          )}

          <Box className="hero-actions">
            <GoldButton
              className="hero-primary"
              endIcon={<ArrowForwardRoundedIcon />}
              component={NavLink}
              to="/tour"
            >
              Explore Tours
            </GoldButton>
            <GoldButton
              className="hero-secondary"
              component={NavLink}
              to="/contact"
            >
              Plan Your Trip
            </GoldButton>
          </Box>

          <Box className="hero-features">
            {heroFeatures.map(feature => (
              <Box key={feature.label} className="hero-feature">
                {featureIcons[feature.icon]}
                <span>{feature.label}</span>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  )
}
