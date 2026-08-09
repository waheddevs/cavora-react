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
  const { tour, isLoading, isError, handleRetry } = useTourDetails()

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
            Tour could not be loaded.{" "}
            <button type="button" onClick={handleRetry}>
              Try again
            </button>{" "}
            or <NavLink to="/tour">back to Tours</NavLink>.
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
