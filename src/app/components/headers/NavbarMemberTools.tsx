import { Box, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded"
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded"
import UserAvatar from "app/components/ui/UserAvatar"
import { useAuth } from "app/hooks/AuthHooks/useAuth"

interface NavbarMemberToolsProps {
  onNavigate: () => void
}

const memberNotifications = [
  {
    id: 1,
    type: "booking",
    title: "Booking confirmed",
    message: "Your next Cavora adventure is officially reserved.",
    time: "5 min",
    unread: true,
  },
  {
    id: 2,
    type: "calendar",
    title: "Departure reminder",
    message: "Your upcoming trip begins in just a few days.",
    time: "2 hr",
    unread: true,
  },
  {
    id: 3,
    type: "offer",
    title: "Member-only escape",
    message: "A handpicked destination now includes a special rate.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: 4,
    type: "explore",
    title: "Fresh inspiration",
    message: "New cultural journeys have arrived in the tour collection.",
    time: "3 days",
    unread: false,
  },
] as const

function NotificationIcon({ type }: { type: string }) {
  if (type === "booking") return <CheckCircleRoundedIcon />
  if (type === "calendar") return <CalendarMonthRoundedIcon />
  if (type === "offer") return <LocalOfferRoundedIcon />
  return <ExploreRoundedIcon />
}

export default function NavbarMemberTools({
  onNavigate,
}: NavbarMemberToolsProps) {
  const { user, isAuthenticated } = useAuth()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [unreadIds, setUnreadIds] = useState<Set<number>>(
    () =>
      new Set(
        memberNotifications
          .filter(notification => notification.unread)
          .map(notification => notification.id),
      ),
  )
  const toolsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!notificationsOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!toolsRef.current?.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNotificationsOpen(false)
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [notificationsOpen])

  if (!isAuthenticated) return null

  const fullName = `${user.firstName} ${user.lastName}`.trim()
  const markAsRead = (notificationId: number) => {
    setUnreadIds(current => {
      const next = new Set(current)
      next.delete(notificationId)
      return next
    })
  }

  return (
    <Box
      className="navbar-member-actions"
      ref={toolsRef}
      onPointerMove={event => {
        const bounds = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty(
          "--member-pointer-x",
          `${event.clientX - bounds.left}px`,
        )
        event.currentTarget.style.setProperty(
          "--member-pointer-y",
          `${event.clientY - bounds.top}px`,
        )
      }}
    >
      <button
        type="button"
        className="navbar-notification-trigger"
        aria-label={`Notifications, ${unreadIds.size} unread`}
        aria-expanded={notificationsOpen}
        aria-controls="member-notifications"
        onClick={() => setNotificationsOpen(current => !current)}
      >
        <NotificationsNoneRoundedIcon />
        {unreadIds.size > 0 && (
          <span className="navbar-notification-badge">{unreadIds.size}</span>
        )}
      </button>

      <NavLink
        to="/user"
        className="navbar-profile-pill"
        aria-label="My account"
        onClick={() => {
          setNotificationsOpen(false)
          onNavigate()
        }}
      >
        <UserAvatar
          className="navbar-member-avatar"
          src={user.avatar}
          name={fullName || user.username}
        />
        <span className="navbar-member-username">@{user.username}</span>
      </NavLink>

      {notificationsOpen && (
        <Box
          id="member-notifications"
          className="navbar-notifications-popover"
          role="dialog"
          aria-label="Member notifications"
        >
          <Box className="navbar-notifications-head">
            <Box>
              <Typography component="h3">Notifications</Typography>
              <span>{unreadIds.size} unread updates</span>
            </Box>
            {unreadIds.size > 0 && (
              <button type="button" onClick={() => setUnreadIds(new Set())}>
                Mark all read
              </button>
            )}
          </Box>

          <Box className="navbar-notifications-list">
            {memberNotifications.map(notification => {
              const isUnread = unreadIds.has(notification.id)

              return (
                <button
                  type="button"
                  key={notification.id}
                  className={`navbar-notification-item${
                    isUnread ? " unread" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <span className="navbar-notification-icon">
                    <NotificationIcon type={notification.type} />
                  </span>
                  <span className="navbar-notification-copy">
                    <strong>{notification.title}</strong>
                    <span>{notification.message}</span>
                  </span>
                  <span className="navbar-notification-time">
                    {notification.time}
                  </span>
                </button>
              )
            })}
          </Box>
        </Box>
      )}
    </Box>
  )
}
