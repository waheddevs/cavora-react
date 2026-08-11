import { useCallback } from "react"
import { useRecordTourViewMutation } from "app/api/toursApi"

const VISITOR_ID_KEY = "cavora.visitor-id"
const VIEWED_TOURS_KEY = "cavora.viewed-tours"

function createVisitorId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, value => {
    const random = Math.floor(Math.random() * 16)
    const digit = value === "x" ? random : (random & 0x3) | 0x8
    return digit.toString(16)
  })
}

function getVisitorId() {
  const storedVisitorId = localStorage.getItem(VISITOR_ID_KEY)
  if (storedVisitorId) return storedVisitorId

  const visitorId = createVisitorId()
  localStorage.setItem(VISITOR_ID_KEY, visitorId)
  return visitorId
}

function getViewedTours() {
  try {
    const storedTours: unknown = JSON.parse(
      localStorage.getItem(VIEWED_TOURS_KEY) ?? "[]",
    )
    return Array.isArray(storedTours)
      ? storedTours.filter(
          (tourId): tourId is number =>
            typeof tourId === "number" && Number.isInteger(tourId),
        )
      : []
  } catch {
    return []
  }
}

export function useTourViews() {
  /* API HOOKS */
  const [recordTourView] = useRecordTourViewMutation()

  /* HANDLERS */
  const registerTourView = useCallback(
    (tourId: number) => {
      const viewedTours = getViewedTours()
      if (viewedTours.includes(tourId)) return

      void recordTourView({ tourId, visitorId: getVisitorId() })
        .unwrap()
        .then(() => {
          const latestViewedTours = getViewedTours()
          if (!latestViewedTours.includes(tourId)) {
            localStorage.setItem(
              VIEWED_TOURS_KEY,
              JSON.stringify([...latestViewedTours, tourId]),
            )
          }
        })
        .catch(() => undefined)
    },
    [recordTourView],
  )

  return { registerTourView }
}
