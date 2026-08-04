import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { getRelatedTours, getTourById } from "app/data/tourData"
import { useOrderBar } from "app/hooks/TourSingleHooks/useOrderBar"
import { useTourGallery } from "app/hooks/TourSingleHooks/useTourGallery"

export function useTourDetailsState() {
  const [searchParams] = useSearchParams()
  const tourId = searchParams.get("id") ?? 1
  const tour = useMemo(() => getTourById(tourId), [tourId])
  const relatedTours = useMemo(
    () => (tour ? getRelatedTours(tour.id, 3) : []),
    [tour],
  )
  const gallery = useTourGallery(tour?.id)
  const order = useOrderBar(tour)

  return { tour, relatedTours, gallery, order }
}
