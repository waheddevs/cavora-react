import { Box, Typography } from "@mui/material"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import { useBookings } from "app/hooks/CommonHooks/useBookings"
import { useBookingDetails } from "app/hooks/UserHooks/useBookingDetails"
import BookingDetailsDialog from "./BookingDetailsDialog"

type BookingFilter = "all" | "reserved" | "past" | "cancelled"

const bookingFilters: { key: BookingFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "reserved", label: "Reserved" },
  { key: "past", label: "Past Trips" },
  { key: "cancelled", label: "Cancelled" },
]

const reservedStatuses = new Set([
  "RESERVED",
  "UPCOMING",
  "PENDING_PAYMENT",
  "CONFIRMED",
  "CANCELLATION_REQUESTED",
])
const pastStatuses = new Set(["COMPLETED"])

function matchesBookingFilter(status: string, filter: BookingFilter) {
  const normalizedStatus = status.toUpperCase()

  if (filter === "reserved") return reservedStatuses.has(normalizedStatus)
  if (filter === "past") return pastStatuses.has(normalizedStatus)
  if (filter === "cancelled") return normalizedStatus === "CANCELLED"
  return true
}

export default function MyBookings() {
  /* HOOKS */
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState<BookingFilter>("all")
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

  const visibleBookings = useMemo(
    () =>
      bookings.filter(booking => booking.status.toUpperCase() !== "EXPIRED"),
    [bookings],
  )

  const filterCounts = useMemo(
    () => ({
      all: visibleBookings.length,
      reserved: visibleBookings.filter(booking =>
        matchesBookingFilter(booking.status, "reserved"),
      ).length,
      past: visibleBookings.filter(booking =>
        matchesBookingFilter(booking.status, "past"),
      ).length,
      cancelled: visibleBookings.filter(booking =>
        matchesBookingFilter(booking.status, "cancelled"),
      ).length,
    }),
    [visibleBookings],
  )

  const filteredBookings = useMemo(
    () =>
      visibleBookings.filter(booking =>
        matchesBookingFilter(booking.status, activeFilter),
      ),
    [activeFilter, visibleBookings],
  )

  return (
    <Box className="user-panel">
      <Box className="booking-heading-row">
        <Box className="booking-heading-copy">
          <h2 className="user-panel-title">My Bookings</h2>
          <p className="user-panel-subtitle">
            Your upcoming adventures and past journeys.
          </p>
        </Box>

        <Box
          className="booking-filter"
          role="group"
          aria-label="Filter bookings by status"
        >
          {bookingFilters.map(filter => (
            <button
              type="button"
              key={filter.key}
              className={`booking-filter-button${
                activeFilter === filter.key ? " active" : ""
              }`}
              aria-pressed={activeFilter === filter.key}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
              <span>{filterCounts[filter.key]}</span>
            </button>
          ))}
        </Box>
      </Box>

      {isLoading && <Typography>Loading bookings...</Typography>}
      {isError && (
        <Typography>
          Your booking journey is taking a short pause. Please return in a
          moment.
        </Typography>
      )}
      {!isLoading && !isError && visibleBookings.length === 0 && (
        <Typography>No bookings yet. Choose a tour to begin.</Typography>
      )}
      {!isLoading &&
        !isError &&
        visibleBookings.length > 0 &&
        filteredBookings.length === 0 && (
          <Box className="booking-filter-empty" role="status">
            <Typography>No bookings match this status yet.</Typography>
            <button type="button" onClick={() => setActiveFilter("all")}>
              Show all bookings
            </button>
          </Box>
        )}

      <Box className="booking-list" key={activeFilter}>
        {filteredBookings.map(booking => {
          const normalizedStatus = booking.status.toUpperCase()
          const statusLabel = booking.status
            .toLowerCase()
            .split("_")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
          const canCancel = ["PENDING_PAYMENT", "CONFIRMED"].includes(
            normalizedStatus,
          )
          const totalLabel =
            normalizedStatus === "PENDING_PAYMENT"
              ? "Amount due"
              : ["CANCELLED", "EXPIRED"].includes(normalizedStatus)
                ? "Booking total"
                : "Total paid"
          const formattedTotal = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: booking.currency || "USD",
          }).format(booking.total)
          const tourPath = `/tour-single?id=${booking.tourId}`
          const tourTitle = booking.tour?.title ?? `Tour #${booking.tourId}`

          return (
            <Box
              className="booking-card"
              key={booking.id}
              role="link"
              tabIndex={0}
              aria-label={`View ${tourTitle}`}
              onClick={() => navigate(tourPath)}
              onKeyDown={event => {
                if (event.currentTarget !== event.target) return
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  navigate(tourPath)
                }
              }}
            >
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
                <Box className="booking-price">
                  <Typography className="booking-total-label">
                    {totalLabel}
                  </Typography>
                  <Typography className="booking-total">
                    {formattedTotal}
                  </Typography>
                </Box>

                <Box className="booking-actions">
                  <button
                    type="button"
                    className="booking-action booking-action--details"
                    onClick={event => {
                      event.stopPropagation()
                      handleOpenBookingDetails(booking)
                    }}
                  >
                    Booking Details
                    <ArrowForwardRoundedIcon />
                  </button>

                  {canCancel && (
                    <button
                      type="button"
                      className="booking-action booking-action--cancel"
                      disabled={cancelling}
                      onClick={event => {
                        event.stopPropagation()
                        void handleCancelBooking(booking.id, booking.tourId)
                      }}
                    >
                      Cancel booking
                    </button>
                  )}
                </Box>
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
