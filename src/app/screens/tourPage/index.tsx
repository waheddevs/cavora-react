import { Box, Container } from "@mui/material"
import SortBar from "./SortBar"
import FilterSidebar from "./FilterSidebar"
import TourCard from "./TourCard"
import TourPagination from "./TourPagination"
import { useTourCatalog } from "app/hooks/TourHooks/useTourCatalog"
import "css/tour.css"

export default function TourPage() {
  /* HOOKS */
  const { page, sort, showFilters, topRef, pagedTours, isLoading, isError } =
    useTourCatalog()

  return (
    <Box className="tour-page">
      <Container maxWidth={false} className="tour-container">
        <Box ref={topRef} className="tour-top-anchor" />
        <SortBar />

        <Box className={`tour-layout${showFilters ? "" : " collapsed"}`}>
          {showFilters && <FilterSidebar />}

          <Box className="tour-main">
            {isLoading ? (
              <p className="tour-empty">Loading tours...</p>
            ) : isError ? (
              <p className="tour-empty">
                Our tour map is refreshing. New adventures will be visible
                shortly.
              </p>
            ) : pagedTours.length ? (
              <Box className="tour-grid" key={`${page}-${sort}`}>
                {pagedTours.map(tour => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </Box>
            ) : (
              <p className="tour-empty">
                No adventures match this route yet. Adjust the filters to
                uncover more journeys.
              </p>
            )}

            <TourPagination />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
