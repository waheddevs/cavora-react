import { Box } from "@mui/material"
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import { useTourCatalog } from "app/hooks/TourHooks/useTourCatalog"

export default function TourPagination() {
  /* HOOKS */
  const {
    page,
    totalPages,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
  } = useTourCatalog()

  if (totalPages <= 1) return null

  return (
    <Box className="tour-pagination">
      <button
        type="button"
        className="tp-btn arrow"
        disabled={page === 1}
        onClick={handlePreviousPage}
        aria-label="Previous page"
      >
        <ChevronLeftRoundedIcon />
      </button>

      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          type="button"
          key={i}
          className={`tp-btn${page === i + 1 ? " active" : ""}`}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        type="button"
        className="tp-btn arrow"
        disabled={page === totalPages}
        onClick={handleNextPage}
        aria-label="Next page"
      >
        <ChevronRightRoundedIcon />
      </button>
    </Box>
  )
}
