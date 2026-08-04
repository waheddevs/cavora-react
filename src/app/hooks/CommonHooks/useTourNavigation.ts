import { useNavigate } from "react-router-dom"

export interface TourNavigation {
  openTour: (tourId: number) => void
  openTourList: () => void
}

export function useTourNavigation(): TourNavigation {
  const navigate = useNavigate()

  const openTour = (tourId: number) => navigate(`/tour-single?id=${tourId}`)
  const openTourList = () => navigate("/tour")

  return { openTour, openTourList }
}
