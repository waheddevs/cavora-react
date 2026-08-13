import { Box } from "@mui/material"
import { useMemo } from "react"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import LuggageRoundedIcon from "@mui/icons-material/LuggageRounded"
import { UserTab } from "app/types/user"
import UserAvatar from "app/components/ui/UserAvatar"
import { useAuth } from "app/hooks/AuthHooks/useAuth"
import { useConfirmedLogout } from "app/hooks/AuthHooks/useConfirmedLogout"
import { useBookings } from "app/hooks/CommonHooks/useBookings"
import { useWishlist } from "app/hooks/CommonHooks/useWishlist"

const activeBookingStatuses = new Set([
  "RESERVED",
  "UPCOMING",
  "PENDING_PAYMENT",
  "CONFIRMED",
])

interface SidebarTabItem {
  key: UserTab
  label: string
  icon: React.ReactNode
}

interface SidebarProps {
  active: UserTab
  onChange: (tab: UserTab) => void
  tabs: SidebarTabItem[]
}

export default function Sidebar({ active, onChange, tabs }: SidebarProps) {
  const { user } = useAuth()
  const { bookings, isLoading: bookingsLoading } = useBookings()
  const { wishlist, isLoading: wishlistLoading } = useWishlist()
  const { handleLogout, logoutPending } = useConfirmedLogout()
  const fullName = `${user.firstName} ${user.lastName}`
  const nextTrip = useMemo(
    () =>
      bookings
        .filter(booking =>
          activeBookingStatuses.has(booking.status.toUpperCase()),
        )
        .sort((first, second) => {
          const firstDate = first.departureDate ?? first.createdAt
          const secondDate = second.departureDate ?? second.createdAt
          return new Date(firstDate).getTime() - new Date(secondDate).getTime()
        })[0],
    [bookings],
  )
  const bookingCount = bookingsLoading ? user.stats.bookings : bookings.length
  const wishlistCount = wishlistLoading ? user.stats.wishlist : wishlist.length
  const nextTripDate = nextTrip?.departureDate ?? nextTrip?.createdAt
  const nextTripDateLabel = nextTripDate
    ? new Date(nextTripDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : ""

  const getTabCount = (tab: UserTab) => {
    if (tab === "bookings") return bookingCount
    if (tab === "wishlist") return wishlistCount
    return undefined
  }

  return (
    <Box className="user-sidebar">
      <Box className="user-sidebar-avatar">
        <UserAvatar src={user.avatar} name={fullName} />
      </Box>

      <p className="user-sidebar-handle">@{user.username}</p>
      <h3 className="user-sidebar-name">{fullName}</h3>

      <Box component="nav" className="user-sidebar-nav">
        {tabs.map(tab => {
          const count = getTabCount(tab.key)

          return (
            <button
              type="button"
              key={tab.key}
              className={`user-sidebar-link ${
                active === tab.key ? "active" : ""
              }`}
              onClick={() => onChange(tab.key)}
            >
              {tab.icon}
              <span className="user-sidebar-link-label">{tab.label}</span>
              {count !== undefined && (
                <span className="user-sidebar-count" aria-label={`${count}`}>
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </button>
          )
        })}
      </Box>

      {nextTrip && (
        <button
          type="button"
          className="user-next-trip"
          onClick={() => onChange("bookings")}
        >
          <span className="user-next-trip-kicker">
            <LuggageRoundedIcon /> Next trip
          </span>
          <span className="user-next-trip-main">
            <span className="user-next-trip-image">
              {nextTrip.tour?.images[0] ? (
                <img src={nextTrip.tour.images[0]} alt="" />
              ) : (
                <LuggageRoundedIcon />
              )}
            </span>
            <span className="user-next-trip-copy">
              <strong>
                {nextTrip.tour?.title ?? `Tour #${nextTrip.tourId}`}
              </strong>
              <span>
                <CalendarMonthRoundedIcon /> {nextTripDateLabel}
              </span>
            </span>
            <ArrowForwardRoundedIcon className="user-next-trip-arrow" />
          </span>
        </button>
      )}

      <Box className="user-sidebar-footer">
        <button
          type="button"
          className="user-sidebar-logout"
          onClick={() => void handleLogout()}
          disabled={logoutPending}
        >
          <LogoutRoundedIcon />
          {logoutPending ? "Logging out..." : "Log Out"}
        </button>
      </Box>
    </Box>
  )
}
