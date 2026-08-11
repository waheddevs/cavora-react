import { Box, Container } from "@mui/material"
import { NavLink } from "react-router-dom"
import AboutTour from "./AboutTour"
import Itinerary from "./Itinerary"
import IncludeRate from "./IncludeRate"
import OrderBar from "./OrderBar"
import RelatedTours from "./RelatedTours"
import { useTourDetails } from "app/hooks/TourSingleHooks/useTourDetails"
import "css/tourSingle.css"

export default function TourSinglePage() {
  /* HOOKS */
  const { tour, isLoading, isError } = useTourDetails()

  if (isLoading) {
    return (
      <Box className="tour-single-page">
        <Container maxWidth={false} className="ts-container">
          <p className="ts-empty">Loading tour...</p>
        </Container>
      </Box>
    )
  }

  if (!tour || isError) {
    return (
      <Box className="tour-single-page">
        <Container maxWidth={false} className="ts-container">
          <p className="ts-empty">
            This adventure is temporarily beyond reach. Discover another route
            in <NavLink to="/tour">Tours</NavLink>.
          </p>
        </Container>
      </Box>
    )
  }

  return (
    <Box className="tour-single-page">
      <Container maxWidth={false} className="ts-container">
        <Box className="ts-layout">
          <Box className="ts-main">
            <AboutTour />
            <Itinerary />
            <IncludeRate />
          </Box>
          <OrderBar />
        </Box>

        <RelatedTours />
      </Container>
    </Box>
  )
}
