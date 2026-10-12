import { Box, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import UserAvatar from "app/components/ui/UserAvatar"
import { useAuth } from "app/hooks/AuthHooks/useAuth"
import {
  formatNotificationTime,
  MemberNotificationType,
  useMemberNotifications,
} from "app/hooks/CommonHooks/useMemberNotifications"

interface NavbarMemberToolsProps {
  onNavigate: () => void
}

function NotificationIcon({ type }: { type: MemberNotificationType }) {
  if (type === "calendar") return <CalendarMonthRoundedIcon />
  return <CheckCircleRoundedIcon />
}

export default function NavbarMemberTools({
  onNavigate,
}: NavbarMemberToolsProps) {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const {
    notifications,
    unreadIds,
    markAsRead,
    markAllAsRead,
    isLoading,
    isError,
  } = useMemberNotifications()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
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
  const notificationSummary = isLoading
    ? "Loading updates..."
    : isError
      ? "Notifications unavailable"
      : unreadIds.size === 0
        ? "No unread updates"
        : `${unreadIds.size} unread update${unreadIds.size === 1 ? "" : "s"}`

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
              <span>{notificationSummary}</span>
            </Box>
            {unreadIds.size > 0 && (
              <button type="button" onClick={markAllAsRead}>
                Mark all read
              </button>
            )}
          </Box>

          <Box className="navbar-notifications-list">
            {!isLoading && !isError && notifications.length === 0 && (
              <Box className="navbar-notifications-state">
                <NotificationsNoneRoundedIcon />
                <strong>You&apos;re all caught up</strong>
                <span>
                  Booking updates and departure reminders appear here.
                </span>
              </Box>
            )}

            {isError && (
              <Box className="navbar-notifications-state" role="alert">
                <span>
                  We couldn&apos;t load your updates. Please try again.
                </span>
              </Box>
            )}

            {notifications.map(notification => {
              const isUnread = unreadIds.has(notification.id)

              return (
                <button
                  type="button"
                  key={notification.id}
                  className={`navbar-notification-item${
                    isUnread ? " unread" : ""
                  }`}
                  onClick={() => {
                    markAsRead(notification.id)
                    setNotificationsOpen(false)
                    onNavigate()
                    navigate("/user", { state: { tab: "bookings" } })
                  }}
                >
                  <span className="navbar-notification-icon">
                    <NotificationIcon type={notification.type} />
                  </span>
                  <span className="navbar-notification-copy">
                    <strong>{notification.title}</strong>
                    <span>{notification.message}</span>
                  </span>
                  <span className="navbar-notification-time">
                    {formatNotificationTime(notification.occurredAt)}
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
