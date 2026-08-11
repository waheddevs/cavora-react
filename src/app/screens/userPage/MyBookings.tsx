import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import { useBookings } from "app/hooks/CommonHooks/useBookings"
import { useBookingDetails } from "app/hooks/UserHooks/useBookingDetails"
import BookingDetailsDialog from "./BookingDetailsDialog"

export default function MyBookings() {
  /* HOOKS */
  const { bookings, handleCancelBooking, isLoading, isError, cancelling } =
    useBookings()
  const {
    booking: bookingDetails,
    selectedBooking,
    isDetailsOpen,
    isDetailsLoading,
    isDetailsError,
    handleOpenBookingDetails,
    handleCloseBookingDetails,
  } = useBookingDetails()

  return (
    <Box className="user-panel">
      <h2 className="user-panel-title">My Bookings</h2>
      <p className="user-panel-subtitle">
        Your upcoming adventures and past journeys.
      </p>

      {isLoading && <Typography>Loading bookings...</Typography>}
      {isError && (
        <Typography>
          Your booking journey is taking a short pause. Please return in a
          moment.
        </Typography>
      )}
      {!isLoading && !isError && bookings.length === 0 && (
        <Typography>No bookings yet. Choose a tour to begin.</Typography>
      )}

      <Box className="booking-list">
        {bookings.map(booking => {
          const statusLabel = booking.status
            .toLowerCase()
            .split("_")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
          const canCancel = ["PENDING_PAYMENT", "CONFIRMED"].includes(
            booking.status,
          )

          return (
            <Box className="booking-card" key={booking.id}>
              <Box className="booking-image">
                <img
                  src={booking.tour?.images[0]}
                  alt={booking.tour?.title ?? "Tour"}
                  loading="lazy"
                />
                <span
                  className={`booking-status booking-status--${booking.status.toLowerCase()}`}
                >
                  {statusLabel}
                </span>
              </Box>

              <Box className="booking-content">
                <Typography className="booking-title">
                  {booking.tour?.title ?? `Tour #${booking.tourId}`}
                </Typography>
                <Box className="booking-meta">
                  <span>
                    <LocationOnRoundedIcon />
                    {booking.tour?.location ?? "Location unavailable"}
                  </span>
                  <span>
                    <CalendarMonthRoundedIcon />
                    {booking.departureDate
                      ? new Date(booking.departureDate).toLocaleDateString()
                      : new Date(booking.createdAt).toLocaleDateString()}
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
                  to={`/tour-single?id=${booking.tourId}`}
                  className="booking-link"
                >
                  View Tour
                </NavLink>
                <button
                  type="button"
                  className="booking-link"
                  onClick={() => handleOpenBookingDetails(booking)}
                >
                  View Details
                </button>
                {canCancel && (
                  <button
                    type="button"
                    className="booking-link"
                    disabled={cancelling}
                    onClick={() =>
                      handleCancelBooking(booking.id, booking.tourId)
                    }
                  >
                    Cancel
                  </button>
                )}
              </Box>
            </Box>
          )
        })}
      </Box>

      <BookingDetailsDialog
        booking={bookingDetails}
        selectedBooking={selectedBooking}
        open={isDetailsOpen}
        isLoading={isDetailsLoading}
        isError={isDetailsError}
        onClose={handleCloseBookingDetails}
      />
    </Box>
  )
}
