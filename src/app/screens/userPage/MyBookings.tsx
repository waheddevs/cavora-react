import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import { useBookings } from "app/hooks/CommonHooks/useBookings"

export default function MyBookings() {
  const { bookings } = useBookings()

  return (
    <Box className="user-panel">
      <h2 className="user-panel-title">My Bookings</h2>
      <p className="user-panel-subtitle">
        Your upcoming adventures and past journeys.
      </p>

      <Box className="booking-list">
        {bookings.map(booking => (
          <Box className="booking-card" key={booking.id}>
            <Box className="booking-image">
              <img src={booking.tour.images[0]} alt={booking.tour.title} />
              <span
                className={`booking-status booking-status--${booking.status.toLowerCase()}`}
              >
                {booking.status}
              </span>
            </Box>

            <Box className="booking-content">
              <Typography className="booking-title">
                {booking.tour.title}
              </Typography>
              <Box className="booking-meta">
                <span>
                  <LocationOnRoundedIcon />
                  {booking.tour.location}
                </span>
                <span>
                  <CalendarMonthRoundedIcon />
                  {booking.date}
                </span>
                <span>
                  <GroupRoundedIcon />
                  {booking.travelers}{" "}
                  {booking.travelers > 1 ? "Travelers" : "Traveler"}
                </span>
              </Box>
            </Box>

            <Box className="booking-side">
              <Typography className="booking-total">
                ${booking.total}
              </Typography>
              <NavLink
                to={`/tour-single?id=${booking.tour.id}`}
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
