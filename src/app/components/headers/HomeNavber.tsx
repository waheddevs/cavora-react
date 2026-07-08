import {
  Box,
  Container,
  Divider,
  IconButton,
  InputBase,
  MenuItem,
  Popover,
  Select,
  Stack,
  Typography,
} from "@mui/material"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import moment from "moment"
import GoldButton from "../ui/GoldButton"
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined"
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined"
import TuneRoundedIcon from "@mui/icons-material/TuneRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import {
  heroSlides,
  tourTypeOptions,
  peopleOptions,
  weekDays,
  buildMonthGrid,
  useHeroSlider,
} from "../../../js/HomeNavbar"

const selectMenuProps = { classes: { paper: "hero-select-menu" } }

const features = [
  { label: "Safety", icon: <ShieldOutlinedIcon className="feature-icon" /> },
  { label: "Homologated", icon: <VerifiedOutlinedIcon className="feature-icon" /> },
  { label: "Tourism", icon: <TravelExploreOutlinedIcon className="feature-icon" /> },
  { label: "Connected Pay", icon: <CreditCardOutlinedIcon className="feature-icon" /> },
]

export default function HomeNavbar() {
  const authMember = null
  const { activeSlide } = useHeroSlider(5000)
  const active = heroSlides[activeSlide]
  const [location, setLocation] = useState("")
  const [tourType, setTourType] = useState("")
  const [date, setDate] = useState("")
  const [people, setPeople] = useState(peopleOptions[1])
  const [calAnchor, setCalAnchor] = useState<HTMLElement | null>(null)
  const [viewMonth, setViewMonth] = useState(moment())
  return (
    <>
      <div className="home-navbar">
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
      <div className="home-hero">
        {/* Background slideshow */}
        <div className="hero-slides">
          {heroSlides.map((slide, i) => (
            <div
              key={slide.img}
              className={`hero-slide${i === activeSlide ? " active" : ""}`}
            >
              <img
                src={slide.img}
                alt={slide.title}
                className="hero-slide-img"
              />
            </div>
          ))}
        </div>
        <div className="hero-overlay" />

        {/* Centered content */}
        <Container maxWidth={false} className="hero-content">
          <Box className="hero-text" key={activeSlide}>
            <Typography className="hero-location">{active.location}</Typography>
            <Typography className="hero-title">
              {active.title.split(" ").map((word, i) => (
                <span key={i}>{word}</span>
              ))}
            </Typography>
            <Typography className="hero-subtitle">{active.subtitle}</Typography>
          </Box>

          <Stack className="hero-features" direction="row">
            {features.map((f) => (
              <Box key={f.label} className="hero-feature">
                {f.icon}
                <span>{f.label}</span>
              </Box>
            ))}
          </Stack>
        </Container>

        {/* Search bar */}
        <Box className="hero-search">
          <Box className="search-field">
            <label className="field-label">LOCATION</label>
            <InputBase
              className="field-input"
              placeholder="Where are you going"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Box>
          <Divider orientation="vertical" flexItem className="field-divider" />

          <Box className="search-field">
            <label className="field-label">TOUR TYPE</label>
            <Select
              className="field-select"
              variant="standard"
              disableUnderline
              displayEmpty
              MenuProps={selectMenuProps}
              value={tourType}
              onChange={(e) => setTourType(e.target.value)}
              renderValue={(v) => (v ? v : "Select Type")}
            >
              {tourTypeOptions.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Divider orientation="vertical" flexItem className="field-divider" />

          <Box className="search-field">
            <label className="field-label">DATE</label>
            <button
              type="button"
              className={`field-date${date ? "" : " placeholder"}`}
              onClick={(e) => setCalAnchor(e.currentTarget)}
            >
              {date ? moment(date).format("DD / MM / YYYY") : "dd / mm / yyyy"}
            </button>
          </Box>
          <Divider orientation="vertical" flexItem className="field-divider" />

          <Box className="search-field">
            <label className="field-label">PEOPLE</label>
            <Select
              className="field-select"
              variant="standard"
              disableUnderline
              MenuProps={selectMenuProps}
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            >
              {peopleOptions.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <IconButton className="search-filter" aria-label="filters">
            <TuneRoundedIcon />
          </IconButton>
          <GoldButton className="search-submit" startIcon={<SearchRoundedIcon />}>
            Search
          </GoldButton>
        </Box>

        {/* Themed date picker */}
        <Popover
          open={Boolean(calAnchor)}
          anchorEl={calAnchor}
          onClose={() => setCalAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          classes={{ paper: "date-popover-paper" }}
        >
          <Box className="calendar">
            <Box className="calendar-head">
              <Typography className="calendar-title">
                {viewMonth.format("MMMM YYYY")}
              </Typography>
              <Box className="calendar-nav">
                <IconButton
                  className="cal-nav-btn"
                  aria-label="previous month"
                  onClick={() =>
                    setViewMonth(viewMonth.clone().subtract(1, "month"))
                  }
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  className="cal-nav-btn"
                  aria-label="next month"
                  onClick={() => setViewMonth(viewMonth.clone().add(1, "month"))}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            </Box>

            <Box className="calendar-weekdays">
              {weekDays.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </Box>

            <Box className="calendar-grid">
              {buildMonthGrid(viewMonth).map((day) => {
                const inMonth = day.month() === viewMonth.month()
                const isToday = day.isSame(moment(), "day")
                const isSelected = date && day.isSame(moment(date), "day")
                return (
                  <button
                    key={day.format("YYYY-MM-DD")}
                    type="button"
                    className={`cal-day${inMonth ? "" : " muted"}${
                      isToday ? " today" : ""
                    }${isSelected ? " selected" : ""}`}
                    onClick={() => {
                      setDate(day.format("YYYY-MM-DD"))
                      setCalAnchor(null)
                    }}
                  >
                    {day.date()}
                  </button>
                )
              })}
            </Box>

            <Box className="calendar-foot">
              <button
                type="button"
                className="cal-action"
                onClick={() => {
                  setDate("")
                  setCalAnchor(null)
                }}
              >
                Clear
              </button>
              <button
                type="button"
                className="cal-action"
                onClick={() => {
                  const today = moment()
                  setDate(today.format("YYYY-MM-DD"))
                  setViewMonth(today.clone())
                  setCalAnchor(null)
                }}
              >
                Today
              </button>
            </Box>
          </Box>
        </Popover>
      </div>
    </>
  )
}
