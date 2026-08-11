import { useContext } from "react"
import { TourDetailsContext } from "app/contexts/tourDetailsContextValue"

export function useTourDetails() {
  const details = useContext(TourDetailsContext)

  if (!details) {
    throw new Error("useTourDetails requires TourDetailsProvider")
  }

  return details
}
