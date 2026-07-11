import { useState } from "react"
import { Box } from "@mui/material"
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded"
import type { Tour } from "./types"

export default function Itinerary({ tour }: { tour: Tour }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Box className="ts-card">
      <h3 className="ts-heading">Day by Day Itinerary</h3>
      <Box className="ts-itinerary">
        {tour.itinerary.map((day, i) => (
          <Box className={`ts-day${open === i ? " open" : ""}`} key={day.title}>
            <button
              type="button"
              className="ts-day-head"
              onClick={() => setOpen(open === i ? null : i)}
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
