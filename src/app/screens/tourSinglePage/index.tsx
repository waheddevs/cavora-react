import { Container } from "@mui/material"
import { NavLink, useSearchParams } from "react-router-dom"
import AboutTour from "./AboutTour"
import Itinerary from "./Itinerary"
import IncludeRate from "./IncludeRate"
import OrderBar from "./OrderBar"
import RelatedTours from "./RelatedTours"
import { getTourById } from "../../../js/TourSingle"
import "../../../css/tour-single.css"

export default function TourSinglePage() {
  const [params] = useSearchParams()
  const tour = getTourById(params.get("id") ?? 1)

  if (!tour) {
    return (
      <div className="tour-single-page">
        <Container maxWidth={false} className="ts-container">
          <p className="ts-empty">
            Tour not found. <NavLink to="/tour">Back to Tours</NavLink>
          </p>
        </Container>
      </div>
    )
  }

  return (
    <div className="tour-single-page">
      <Container maxWidth={false} className="ts-container">
        <div className="ts-layout">
          <div className="ts-main">
            <AboutTour tour={tour} />
            <Itinerary tour={tour} />
            <IncludeRate tour={tour} />
          </div>
          <OrderBar tour={tour} />
        </div>

        <RelatedTours currentId={tour.id} />
      </Container>
    </div>
  )
}
