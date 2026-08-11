import { useSearchParams } from "react-router-dom"
import { useOrderBar } from "app/hooks/TourSingleHooks/useOrderBar"
import { useTourGallery } from "app/hooks/TourSingleHooks/useTourGallery"
import { useGetRelatedToursQuery, useGetTourQuery } from "app/api/toursApi"

export function useTourDetailsState() {
  /* ROUTER HOOKS */
  const [searchParams] = useSearchParams()

  /* DERIVED ROUTE DATA */
  const parsedTourId = Number(searchParams.get("id") ?? 1)
  const tourId =
    Number.isInteger(parsedTourId) && parsedTourId > 0 ? parsedTourId : 0

  /* API HOOKS */
  const tourQuery = useGetTourQuery(tourId, { skip: tourId === 0 })
  const relatedQuery = useGetRelatedToursQuery(tourId, { skip: tourId === 0 })

  /* DERIVED DATA */
  const tour = tourQuery.data
  const relatedTours = relatedQuery.data ?? []

  /* DOMAIN HOOKS */
  const gallery = useTourGallery(tour?.id)
  const order = useOrderBar(tour)

  return {
    tour,
    relatedTours,
    gallery,
    order,
    isLoading: tourQuery.isLoading,
    isError: tourId === 0 || tourQuery.isError,
  }
}
