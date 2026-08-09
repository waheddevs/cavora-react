import { MouseEvent } from "react"
import { useTourNavigation } from "app/hooks/CommonHooks/useTourNavigation"
import { useWishlist } from "app/hooks/CommonHooks/useWishlist"

export function useTourCard(tourId: number) {
  /* DOMAIN HOOKS */
  const { openTour } = useTourNavigation()
  const { isWishlisted, toggleWishlist } = useWishlist()

  /* DERIVED DATA */
  const saved = isWishlisted(tourId)

  /* HANDLERS */
  const handleOpen = () => openTour(tourId)
  const handleToggleSaved = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    toggleWishlist(tourId)
  }

  return { saved, handleOpen, handleToggleSaved }
}
