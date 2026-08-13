import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded"
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded"
import { NavLink } from "react-router-dom"
import { BookingDetails, BookingRecord } from "app/types/booking"
import { useNotifications } from "app/hooks/CommonHooks/useSweetAlert"

interface BookingDetailsDialogProps {
  booking?: BookingDetails
  selectedBooking: BookingRecord | null
  open: boolean
  isLoading: boolean
  isError: boolean
  onClose: () => void
}

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function formatDate(value?: string) {
  if (!value) return "Not available"
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value)
}

export default function BookingDetailsDialog({
  booking,
  selectedBooking,
  open,
  isLoading,
  isError,
  onClose,
}: BookingDetailsDialogProps) {
  const { notifyError, notifySuccess } = useNotifications()
  const tour = selectedBooking?.tour

  const handleCopyReference = async (reference: string) => {
    try {
      await navigator.clipboard.writeText(reference)
      await notifySuccess({
        title: "Reference copied",
        message: "The booking reference is ready to paste.",
      })
    } catch {
      await notifyError({
        title: "Copy paused",
        message: "Select the reference and copy it manually.",
      })
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      className="booking-details-dialog"
    >
      <DialogTitle className="booking-dialog-head">
        <Box>
          <Typography className="booking-dialog-kicker">
            Booking details
          </Typography>
          <Typography className="booking-dialog-title">
            {tour?.title ?? "Your Cavora journey"}
          </Typography>
        </Box>
        <IconButton onClick={onClose} aria-label="Close booking details">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className="booking-dialog-content">
        {isLoading && (
          <Box className="booking-dialog-state" aria-live="polite">
            <span className="booking-dialog-loader" />
            <Typography>Preparing your booking details...</Typography>
          </Box>
        )}

        {isError && !isLoading && (
          <Box className="booking-dialog-state">
            <Typography>
              This booking’s details are taking a short pause. Your journey
              remains safely listed in My Bookings.
            </Typography>
          </Box>
        )}

        {booking && !isLoading && !isError && (
          <>
            <Box className="booking-dialog-summary">
              <Box className="booking-dialog-tour">
                {tour?.images[0] && (
                  <img src={tour.images[0]} alt={tour.title} loading="lazy" />
                )}
                <Box>
                  <Typography className="booking-dialog-location">
                    {tour?.location ?? `Tour #${booking.tourId}`}
                  </Typography>
                  <span
                    className={`booking-dialog-status booking-dialog-status--${booking.status.toLowerCase()}`}
                  >
                    {formatStatus(booking.status)}
                  </span>
                </Box>
              </Box>
            </Box>

            <Box className="booking-dialog-facts">
              <Box className="booking-dialog-reference">
                <ConfirmationNumberRoundedIcon />
                <span>
                  <small>Reference</small>
                  <strong title={booking.reference}>{booking.reference}</strong>
                </span>
                <button
                  type="button"
                  className="booking-dialog-copy"
                  aria-label="Copy booking reference"
                  title="Copy reference"
                  onClick={() => void handleCopyReference(booking.reference)}
                >
                  <ContentCopyRoundedIcon />
                </button>
              </Box>
              <Box>
                <CalendarMonthRoundedIcon />
                <span>
                  <small>Departure</small>
                  <strong>
                    {selectedBooking?.departureDate
                      ? formatDate(selectedBooking.departureDate)
                      : "Schedule unavailable"}
                  </strong>
                </span>
              </Box>
              <Box>
                <GroupRoundedIcon />
                <span>
                  <small>Travelers</small>
                  <strong>{booking.travelers}</strong>
                </span>
              </Box>
            </Box>

            <Box className="booking-dialog-prices">
              <Box>
                <span>Price per traveler</span>
                <strong>
                  {formatMoney(booking.unitPrice, booking.currency)}
                </strong>
              </Box>
              <Box>
                <span>Subtotal</span>
                <strong>
                  {formatMoney(booking.subtotal, booking.currency)}
                </strong>
              </Box>
              <Box>
                <span>Service fee</span>
                <strong>
                  {formatMoney(booking.serviceFee, booking.currency)}
                </strong>
              </Box>
              <Box className="booking-dialog-total">
                <span>Total</span>
                <strong>{formatMoney(booking.total, booking.currency)}</strong>
              </Box>
            </Box>

            <Box className="booking-dialog-timeline">
              <Typography>
                <span>Booked</span> {formatDate(booking.createdAt)}
              </Typography>
              {booking.confirmedAt && (
                <Typography>
                  <span>Confirmed</span> {formatDate(booking.confirmedAt)}
                </Typography>
              )}
              {booking.cancelledAt && (
                <Typography>
                  <span>Cancelled</span> {formatDate(booking.cancelledAt)}
                </Typography>
              )}
            </Box>

            <NavLink
              to={`/tour-single?id=${booking.tourId}`}
              className="booking-dialog-tour-link"
              onClick={onClose}
            >
              Explore this tour
            </NavLink>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
