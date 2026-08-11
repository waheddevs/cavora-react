import { useNavigate } from "react-router-dom"
import { useTourViews } from "./useTourViews"

interface TourNavigation {
  openTour: (tourId: number) => void
  openTourList: () => void
}

export function useTourNavigation(): TourNavigation {
  const navigate = useNavigate()
  const { registerTourView } = useTourViews()

  const openTour = (tourId: number) => {
    registerTourView(tourId)
    navigate(`/tour-single?id=${tourId}`)
  }
  const openTourList = () => navigate("/tour")

  return { openTour, openTourList }
}
