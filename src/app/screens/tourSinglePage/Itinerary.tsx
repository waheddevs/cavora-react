import { Box } from "@mui/material"
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded"
import { useAccordion } from "app/hooks/CommonHooks/useAccordion"
import { useTourDetails } from "app/hooks/TourSingleHooks/useTourDetails"

export default function Itinerary() {
  const { tour } = useTourDetails()
  const { openIndex, toggleItem } = useAccordion(0)
  if (!tour) return null

  return (
    <Box className="ts-card">
      <h3 className="ts-heading">Day by Day Itinerary</h3>
      <Box className="ts-itinerary">
        {tour.itinerary.map((day, i) => (
          <Box
            className={`ts-day${openIndex === i ? "open" : ""}`}
            key={day.title}
          >
            <button
              type="button"
              className="ts-day-head"
              onClick={() => toggleItem(i)}
            >
              <span className="ts-day-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="ts-day-title">{day.title}</span>
              <ExpandMoreRoundedIcon className="ts-day-chevron" />
            </button>
            <Box className="ts-day-body">
              <p>{day.text}</p>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
