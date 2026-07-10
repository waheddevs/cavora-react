import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"

interface Props {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export default function TourPagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null

  return (
    <div className="tour-pagination">
      <button
        type="button"
        className="tp-btn arrow"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeftRoundedIcon />
      </button>

      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          type="button"
          key={i}
          className={`tp-btn${page === i + 1 ? " active" : ""}`}
          onClick={() => onChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        type="button"
        className="tp-btn arrow"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRightRoundedIcon />
      </button>
    </div>
  )
}
