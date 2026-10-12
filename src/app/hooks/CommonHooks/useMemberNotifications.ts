import { useCallback, useMemo, useState } from "react"
import { useGetBookingHistoryQuery } from "app/api/bookingApi"
import { useAuth } from "app/hooks/AuthHooks/useAuth"
import { BookingRecord } from "app/types/booking"

export type MemberNotificationType = "booking" | "calendar"

export interface MemberNotification {
  id: string
  type: MemberNotificationType
  title: string
  message: string
  occurredAt: string
}

const REMINDER_WINDOW_DAYS = 7
const confirmedStatuses = new Set(["CONFIRMED"])

function getTourName(booking: BookingRecord) {
  return booking.tour?.title ?? `Booking ${booking.reference}`
}

function getStatusNotification(
  booking: BookingRecord,
): MemberNotification | null {
  const tourName = getTourName(booking)
  const status = booking.status.toUpperCase()
  const content: Record<string, { title: string; message: string }> = {
    PENDING_PAYMENT: {
      title: "Payment pending",
      message: `Complete payment to reserve ${tourName}.`,
    },
    CONFIRMED: {
      title: "Booking confirmed",
      message: `${tourName} is officially reserved.`,
    },
    COMPLETED: {
      title: "Trip completed",
      message: `We hope you enjoyed ${tourName}.`,
    },
    CANCELLATION_REQUESTED: {
      title: "Cancellation requested",
      message: `Your cancellation request for ${tourName} is being reviewed.`,
    },
    CANCELLED: {
      title: "Booking cancelled",
      message: `${tourName} has been removed from your upcoming trips.`,
    },
    REFUNDED: {
      title: "Payment refunded",
      message: `The refund for ${tourName} has been processed.`,
    },
  }
  const notification = content[status]

  if (!notification) return null

  return {
    id: `${booking.id}:status:${status}`,
    type: "booking",
    occurredAt: booking.createdAt,
    ...notification,
  }
}

function getDepartureNotification(
  booking: BookingRecord,
  now: Date,
): MemberNotification | null {
  if (
    !booking.departureDate ||
    !confirmedStatuses.has(booking.status.toUpperCase())
  ) {
    return null
  }

  const departure = new Date(booking.departureDate)
  const millisecondsUntilDeparture = departure.getTime() - now.getTime()
  const reminderWindow = REMINDER_WINDOW_DAYS * 24 * 60 * 60 * 1000

  if (
    millisecondsUntilDeparture < 0 ||
    millisecondsUntilDeparture > reminderWindow
  ) {
    return null
  }

  const daysUntilDeparture = Math.max(
    1,
    Math.ceil(millisecondsUntilDeparture / (24 * 60 * 60 * 1000)),
  )

  return {
    id: `${booking.id}:departure:${booking.departureDate}`,
    type: "calendar",
    title: "Departure reminder",
    message: `${getTourName(booking)} begins in ${daysUntilDeparture} day${
      daysUntilDeparture === 1 ? "" : "s"
    }.`,
    occurredAt: new Date(departure.getTime() - reminderWindow).toISOString(),
  }
}

function buildNotifications(bookings: BookingRecord[]) {
  const now = new Date()

  return bookings
    .flatMap(booking => [
      getDepartureNotification(booking, now),
      getStatusNotification(booking),
    ])
    .filter(
      (notification): notification is MemberNotification =>
        notification !== null,
    )
    .sort(
      (left, right) =>
        new Date(right.occurredAt).getTime() -
        new Date(left.occurredAt).getTime(),
    )
}

function getStoredReadIds(storageKey: string) {
  if (!storageKey || typeof window === "undefined") return new Set<string>()

  try {
    const storedIds: unknown = JSON.parse(
      localStorage.getItem(storageKey) ?? "[]",
    )
    return new Set(
      Array.isArray(storedIds)
        ? storedIds.filter((id): id is string => typeof id === "string")
        : [],
    )
  } catch {
    return new Set<string>()
  }
}

export function formatNotificationTime(value: string) {
  const timestamp = new Date(value).getTime()
  const elapsed = Math.max(0, Date.now() - timestamp)
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  if (elapsed < minute) return "Just now"
  if (elapsed < hour) return `${Math.floor(elapsed / minute)} min`
  if (elapsed < day) return `${Math.floor(elapsed / hour)} hr`
  if (elapsed < 2 * day) return "Yesterday"
  if (elapsed < 7 * day) return `${Math.floor(elapsed / day)} days`

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(value))
}

export function useMemberNotifications() {
  const { user, isAuthenticated } = useAuth()
  const bookingQuery = useGetBookingHistoryQuery(
    { page: 1, limit: 50 },
    { skip: !isAuthenticated },
  )
  const storageKey = user.id ? `cavora:notifications:read:${user.id}` : ""
  const [readState, setReadState] = useState<{
    storageKey: string
    ids: Set<string>
  }>({ storageKey: "", ids: new Set() })
  const notifications = useMemo(
    () => buildNotifications(bookingQuery.data?.data ?? []),
    [bookingQuery.data?.data],
  )
  const readIds = useMemo(
    () =>
      readState.storageKey === storageKey
        ? readState.ids
        : getStoredReadIds(storageKey),
    [readState, storageKey],
  )

  const saveReadIds = useCallback(
    (next: Set<string>) => {
      setReadState({ storageKey, ids: next })
      if (!storageKey) return

      try {
        localStorage.setItem(storageKey, JSON.stringify([...next]))
      } catch {
        // The UI still works when storage is disabled or unavailable.
      }
    },
    [storageKey],
  )

  const markAsRead = useCallback(
    (notificationId: string) => {
      const next = new Set(readIds)
      next.add(notificationId)
      saveReadIds(next)
    },
    [readIds, saveReadIds],
  )

  const markAllAsRead = useCallback(() => {
    const next = new Set(readIds)
    notifications.forEach(notification => next.add(notification.id))
    saveReadIds(next)
  }, [notifications, readIds, saveReadIds])

  const unreadIds = useMemo(
    () =>
      new Set(
        notifications
          .filter(notification => !readIds.has(notification.id))
          .map(notification => notification.id),
      ),
    [notifications, readIds],
  )

  return {
    notifications,
    unreadIds,
    markAsRead,
    markAllAsRead,
    isLoading: bookingQuery.isLoading,
    isError: bookingQuery.isError,
  }
}
