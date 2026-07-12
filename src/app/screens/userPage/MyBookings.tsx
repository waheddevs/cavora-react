import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import { bookings } from "ts/User"

export default function MyBookings() {
  return (
    <Box className="user-panel">
      <Typography className="user-panel-title">My Bookings</Typography>
      <Typography className="user-panel-subtitle">
        Your upcoming adventures and past journeys.
      </Typography>

      <Box className="booking-list">
        {bookings.map((b) => (
          <Box className="booking-card" key={b.id}>
            <Box className="booking-image">
              <img src={b.tour.images[0]} alt={b.tour.title} />
              <span
                className={`booking-status booking-status--${b.status.toLowerCase()}`}
              >
                {b.status}
              </span>
            </Box>

            <Box className="booking-content">
              <Typography className="booking-title">{b.tour.title}</Typography>
              <Box className="booking-meta">
                <span>
                  <LocationOnRoundedIcon />
                  {b.tour.location}
                </span>
                <span>
                  <CalendarMonthRoundedIcon />
                  {b.date}
                </span>
                <span>
                  <GroupRoundedIcon />
                  {b.travelers} {b.travelers > 1 ? "Travelers" : "Traveler"}
                </span>
              </Box>
            </Box>

            <Box className="booking-side">
              <Typography className="booking-total">${b.total}</Typography>
              <NavLink
                to={`/tour-single?id=${b.tour.id}`}
                className="booking-link"
              >
                View Tour
              </NavLink>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
