import { MouseEvent } from "react"
import { useTourNavigation } from "app/hooks/CommonHooks/useTourNavigation"
import { useWishlist } from "app/hooks/CommonHooks/useWishlist"

export function useTourCard(tourId: number) {
  const { openTour } = useTourNavigation()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const saved = isWishlisted(tourId)

  const open = () => openTour(tourId)
  const toggleSaved = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    toggleWishlist(tourId)
  }

  return { saved, open, toggleSaved }
}
