import { MouseEvent, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { Tour } from "app/types/tour"
import { useWishlist } from "app/hooks/CommonHooks/useWishlist"
import { useGetTourAvailabilityQuery } from "app/api/toursApi"
import { useCreateBookingHoldMutation } from "app/api/bookingApi"
import { useAuth } from "app/hooks/AuthHooks/useAuth"

export function useOrderBar(tour?: Tour) {
  /* ROUTER HOOKS */
  const navigate = useNavigate()

  /* DOMAIN HOOKS */
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { isAuthenticated } = useAuth()

  /* STATE */
  const [date, setDate] = useState("")
  const [guests, setGuests] = useState(1)
  const [calendarAnchor, setCalendarAnchor] = useState<HTMLElement | null>(null)
  const [viewMonth, setViewMonth] = useState(moment())
  const [dateError, setDateError] = useState(false)

  /* API HOOKS */
  const [createBookingHold, bookingHoldState] = useCreateBookingHoldMutation()
  const availabilityQuery = useGetTourAvailabilityQuery(
    { tourId: tour?.id ?? 0, travelers: guests },
    { skip: !tour },
  )

  /* DERIVED DATA */
  const saved = tour ? isWishlisted(tour.id) : false
  const departures = useMemo(
    () => availabilityQuery.data?.departures ?? [],
    [availabilityQuery.data?.departures],
  )
  const availableDates = useMemo(
    () =>
      new Set(departures.map(departure => departure.startDate.slice(0, 10))),
    [departures],
  )
  const selectedDeparture = useMemo(
    () => departures.find(departure => departure.startDate.startsWith(date)),
    [date, departures],
  )
  const unitPrice = selectedDeparture
    ? selectedDeparture.priceCents / 100
    : (tour?.price ?? 0)
  const total = unitPrice * guests

  /* EFFECTS */
  useEffect(() => {
    setDate("")
    setGuests(1)
    setCalendarAnchor(null)
    setViewMonth(moment())
    setDateError(false)
  }, [tour?.id])

  /* HANDLERS */
  const handleBookNow = async () => {
    if (!tour) return

    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    if (!date || !selectedDeparture) {
      setDateError(true)
      setCalendarAnchor(document.getElementById("ts-date-btn"))
      return
    }

    try {
      const booking = await createBookingHold({
        tourId: tour.id,
        departureId: selectedDeparture.id,
        travelers: guests,
      }).unwrap()
      navigate(
        `/payment?bookingId=${booking.id}&tourId=${tour.id}&date=${date}&guests=${guests}`,
      )
    } catch {
      return
    }
  }

  const handleOpenCalendar = (event: MouseEvent<HTMLButtonElement>) => {
    setDateError(false)
    setCalendarAnchor(event.currentTarget)
  }
  const handleCloseCalendar = () => setCalendarAnchor(null)
  const handleDecreaseGuests = () => setGuests(count => Math.max(1, count - 1))
  const handleIncreaseGuests = () => setGuests(count => count + 1)
  const handleToggleSaved = () => {
    if (tour) toggleWishlist(tour.id)
  }
  const handlePreviousMonth = () =>
    setViewMonth(month => month.clone().subtract(1, "month"))
  const handleNextMonth = () =>
    setViewMonth(month => month.clone().add(1, "month"))
  const handleSelectDate = (day: moment.Moment) => {
    const nextDate = day.format("YYYY-MM-DD")
    if (!availableDates.has(nextDate)) return
    setDate(nextDate)
    setDateError(false)
    handleCloseCalendar()
  }
  const handleClearDate = () => {
    setDate("")
    handleCloseCalendar()
  }
  const handleSelectToday = () => {
    const today = moment()
    const todayValue = today.format("YYYY-MM-DD")
    const nextDate = availableDates.has(todayValue)
      ? todayValue
      : departures[0]?.startDate.slice(0, 10)
    if (!nextDate) return
    setDate(nextDate)
    setDateError(false)
    setViewMonth(today.clone())
    handleCloseCalendar()
  }

  return {
    date,
    guests,
    calendarAnchor,
    viewMonth,
    saved,
    dateError,
    availabilityError: availabilityQuery.isError,
    availabilityLoading:
      availabilityQuery.isLoading || availabilityQuery.isFetching,
    availableDates,
    selectedDeparture,
    bookingHoldLoading: bookingHoldState.isLoading,
    bookingHoldError: bookingHoldState.isError,
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
  }
}
