import { Box, Container } from "@mui/material"
import SortBar from "./SortBar"
import FilterSidebar from "./FilterSidebar"
import TourCard from "./TourCard"
import TourPagination from "./TourPagination"
import { useTourCatalog } from "app/hooks/TourHooks/useTourCatalog"
import "css/tour.css"

export default function TourPage() {
  /* HOOKS */
  const {
    page,
    sort,
    showFilters,
    topRef,
    pagedTours,
    isLoading,
    isError,
    handleRetry,
  } = useTourCatalog()

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
                Tours could not be loaded.{" "}
                <button type="button" onClick={handleRetry}>
                  Try again
                </button>
              </p>
            ) : pagedTours.length ? (
              <Box className="tour-grid" key={`${page}-${sort}`}>
                {pagedTours.map(tour => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </Box>
            ) : (
              <p className="tour-empty">
                No tours match your filters. Try adjusting them.
              </p>
            )}

            <TourPagination />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
