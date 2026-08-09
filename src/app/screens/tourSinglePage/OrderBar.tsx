import moment from "moment"
import { Box, IconButton, Popover, Typography } from "@mui/material"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded"
import AddRoundedIcon from "@mui/icons-material/AddRounded"
import SailingRoundedIcon from "@mui/icons-material/SailingRounded"
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded"
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded"
import HeadsetMicRoundedIcon from "@mui/icons-material/HeadsetMicRounded"
import { weekDays, buildMonthGrid } from "app/utils/calendar"
import { useTourDetails } from "app/hooks/TourSingleHooks/useTourDetails"

export default function OrderBar() {
  /* HOOKS */
  const { tour, order } = useTourDetails()
  const {
    date,
    guests,
    calendarAnchor,
    viewMonth,
    saved,
    dateError,
    availabilityError,
    availabilityLoading,
    availableDates,
    bookingHoldLoading,
    bookingHoldError,
    total,
    handleBookNow,
    handleOpenCalendar,
    handleCloseCalendar,
    handleDecreaseGuests,
    handleIncreaseGuests,
    handleToggleSaved,
    handlePreviousMonth,
    handleNextMonth,
    handleSelectDate,
    handleClearDate,
    handleSelectToday,
  } = order
  if (!tour) return null

  return (
    <aside className="ts-order">
      <Box className="ts-order-card">
        <Box className="ts-order-price">
          <Box>
            <small>From</small>
            <strong>${tour.price.toLocaleString()}</strong>
            <span className="ts-old">${tour.oldPrice.toLocaleString()}</span>
          </Box>
          <span className="ts-order-rating">
            <StarRoundedIcon />
            {tour.rating.toFixed(1)}
          </span>
        </Box>

        <Box className="ts-field">
          <span>Check-in Date</span>
          <button
            id="ts-date-btn"
            type="button"
            className={`ts-date-btn${dateError ? " has-error" : ""}`}
            onClick={handleOpenCalendar}
          >
            <CalendarMonthOutlinedIcon />
            <span className={date ? "" : "ph"}>
              {date ? moment(date).format("DD MMM YYYY") : "Select a date"}
            </span>
          </button>
          {dateError && (
            <span className="ts-field-error">
              Please pick a date before booking
            </span>
          )}
          {availabilityLoading && (
            <span className="ts-field-error">
              Checking available departures...
            </span>
          )}
          {availabilityError && (
            <span className="ts-field-error">
              Availability could not be loaded.
            </span>
          )}
        </Box>

        <Box className="ts-field">
          <span>Guests</span>
          <Box className="ts-counter">
            <button
              type="button"
              aria-label="Decrease guests"
              onClick={handleDecreaseGuests}
            >
              <RemoveRoundedIcon />
            </button>
            <strong>{guests}</strong>
            <button
              type="button"
              aria-label="Increase guests"
              onClick={handleIncreaseGuests}
            >
              <AddRoundedIcon />
            </button>
          </Box>
        </Box>

        <Box className="ts-total">
          <span>Total Price</span>
          <strong>${total.toLocaleString()}</strong>
        </Box>

        <button
          type="button"
          className="ts-book"
          onClick={handleBookNow}
          disabled={bookingHoldLoading || availabilityLoading}
        >
          <SailingRoundedIcon />
          {bookingHoldLoading ? "Reserving..." : "Book Now"}
        </button>
        {bookingHoldError && (
          <span className="ts-field-error">
            Booking could not be reserved. Please try another departure.
          </span>
        )}
        <button
          type="button"
          className={`ts-wishlist${saved ? " saved" : ""}`}
          onClick={handleToggleSaved}
        >
          {saved ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
          {saved ? "Saved to Wishlist" : "Add to Wishlist"}
        </button>
      </Box>

      <Box className="ts-help">
        <Box className="ts-help-icon">
          <HeadsetMicRoundedIcon />
        </Box>
        <Box>
          <small>Need Help? Call us</small>
          <strong>+8210 1234-5678</strong>
        </Box>
      </Box>

      <Popover
        open={Boolean(calendarAnchor)}
        anchorEl={calendarAnchor}
        onClose={handleCloseCalendar}
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
                onClick={handlePreviousMonth}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                className="cal-nav-btn"
                aria-label="next month"
                onClick={handleNextMonth}
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>
          </Box>

          <Box className="calendar-weekdays">
            {weekDays.map(dayLabel => (
              <span key={dayLabel}>{dayLabel}</span>
            ))}
          </Box>

          <Box className="calendar-grid">
            {buildMonthGrid(viewMonth).map(day => {
              const inMonth = day.month() === viewMonth.month()
              const isToday = day.isSame(moment(), "day")
              const isSelected = date && day.isSame(moment(date), "day")
              const dateValue = day.format("YYYY-MM-DD")
              const isAvailable = availableDates.has(dateValue)
              return (
                <button
                  key={day.format("YYYY-MM-DD")}
                  type="button"
                  className={`cal-day${inMonth ? "" : " muted"}${
                    isToday ? " today" : ""
                  }${isSelected ? " selected" : ""}${
                    isAvailable ? "" : " muted"
                  }`}
                  disabled={!isAvailable}
                  onClick={() => handleSelectDate(day)}
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
              onClick={handleClearDate}
            >
              Clear
            </button>
            <button
              type="button"
              className="cal-action"
              onClick={handleSelectToday}
            >
              Today
            </button>
          </Box>
        </Box>
      </Popover>
    </aside>
  )
}
