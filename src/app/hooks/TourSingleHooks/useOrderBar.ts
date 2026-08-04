import { MouseEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { Tour } from "app/types/tour"
import { useWishlist } from "app/hooks/CommonHooks/useWishlist"

export function useOrderBar(tour?: Tour) {
  const navigate = useNavigate()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const [date, setDate] = useState("")
  const [guests, setGuests] = useState(1)
  const [calendarAnchor, setCalendarAnchor] = useState<HTMLElement | null>(null)
  const [viewMonth, setViewMonth] = useState(moment())
  const saved = tour ? isWishlisted(tour.id) : false
  const [dateError, setDateError] = useState(false)
  const total = (tour?.price ?? 0) * guests

  useEffect(() => {
    setDate("")
    setGuests(1)
    setCalendarAnchor(null)
    setViewMonth(moment())
    setDateError(false)
  }, [tour?.id])

  const handleBookNow = () => {
    if (!tour) return

    if (!date) {
      setDateError(true)
      setCalendarAnchor(document.getElementById("ts-date-btn"))
      return
    }

    navigate(`/payment?tourId=${tour.id}&date=${date}&guests=${guests}`)
  }

  const openCalendar = (event: MouseEvent<HTMLButtonElement>) => {
    setDateError(false)
    setCalendarAnchor(event.currentTarget)
  }
  const closeCalendar = () => setCalendarAnchor(null)
  const decreaseGuests = () => setGuests(count => Math.max(1, count - 1))
  const increaseGuests = () => setGuests(count => count + 1)
  const toggleSaved = () => {
    if (tour) toggleWishlist(tour.id)
  }
  const showPreviousMonth = () =>
    setViewMonth(month => month.clone().subtract(1, "month"))
  const showNextMonth = () =>
    setViewMonth(month => month.clone().add(1, "month"))
  const selectDate = (day: moment.Moment) => {
    setDate(day.format("YYYY-MM-DD"))
    setDateError(false)
    closeCalendar()
  }
  const clearDate = () => {
    setDate("")
    closeCalendar()
  }
  const selectToday = () => {
    const today = moment()
    setDate(today.format("YYYY-MM-DD"))
    setDateError(false)
    setViewMonth(today.clone())
    closeCalendar()
  }

  return {
    date,
    guests,
    calendarAnchor,
    viewMonth,
    saved,
    dateError,
    total,
    handleBookNow,
    openCalendar,
    closeCalendar,
    decreaseGuests,
    increaseGuests,
    toggleSaved,
    showPreviousMonth,
    showNextMonth,
    selectDate,
    clearDate,
    selectToday,
  }
}
