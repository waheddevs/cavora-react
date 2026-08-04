import { Box } from "@mui/material"
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import { useTourCatalog } from "app/hooks/TourHooks/useTourCatalog"

export default function TourPagination() {
  const { page, totalPages, goToPage } = useTourCatalog()

  if (totalPages <= 1) return null

  return (
    <Box className="tour-pagination">
      <button
        type="button"
        className="tp-btn arrow"
        disabled={page === 1}
        onClick={() => goToPage(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeftRoundedIcon />
      </button>

      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          type="button"
          key={i}
          className={`tp-btn${page === i + 1 ? " active" : ""}`}
          onClick={() => goToPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        type="button"
        className="tp-btn arrow"
        disabled={page === totalPages}
        onClick={() => goToPage(page + 1)}
        aria-label="Next page"
      >
        <ChevronRightRoundedIcon />
      </button>
    </Box>
  )
}
