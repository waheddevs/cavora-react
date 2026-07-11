import { useState } from "react"
import moment from "moment"
import { Box, IconButton, Popover, Typography } from "@mui/material"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded"
import AddRoundedIcon from "@mui/icons-material/AddRounded"
import SailingRoundedIcon from "@mui/icons-material/SailingRounded"
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded"
import HeadsetMicRoundedIcon from "@mui/icons-material/HeadsetMicRounded"
import { weekDays, buildMonthGrid } from "js/HomeNavbar"
import type { Tour } from "app/libs/types"

export default function OrderBar({ tour }: { tour: Tour }) {
  const [date, setDate] = useState("")
  const [guests, setGuests] = useState(1)
  const [calAnchor, setCalAnchor] = useState<HTMLElement | null>(null)
  const [viewMonth, setViewMonth] = useState(moment())

  const total = tour.price * guests

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
            type="button"
            className="ts-date-btn"
            onClick={(e) => setCalAnchor(e.currentTarget)}
          >
            <CalendarMonthOutlinedIcon />
            <span className={date ? "" : "ph"}>
              {date ? moment(date).format("DD MMM YYYY") : "Select a date"}
            </span>
          </button>
        </Box>

        <Box className="ts-field">
          <span>Guests</span>
          <Box className="ts-counter">
            <button
              type="button"
              aria-label="Decrease guests"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
            >
              <RemoveRoundedIcon />
            </button>
            <strong>{guests}</strong>
            <button
              type="button"
              aria-label="Increase guests"
              onClick={() => setGuests((g) => g + 1)}
            >
              <AddRoundedIcon />
            </button>
          </Box>
        </Box>

        <Box className="ts-total">
          <span>Total Price</span>
          <strong>${total.toLocaleString()}</strong>
        </Box>

        <button type="button" className="ts-book">
          <SailingRoundedIcon />
          Book Now
        </button>
        <button type="button" className="ts-enquiry">
          <MailOutlineRoundedIcon />
          Send Enquiry
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

      {/* Themed date picker (same as the home hero search) */}
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
    </aside>
  )
}
