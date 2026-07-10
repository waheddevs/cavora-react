import { useState } from "react"
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded"
import type { Tour } from "./types"

export default function Itinerary({ tour }: { tour: Tour }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="ts-card">
      <h3 className="ts-heading">Day by Day Itinerary</h3>
      <div className="ts-itinerary">
        {tour.itinerary.map((day, i) => (
          <div className={`ts-day${open === i ? " open" : ""}`} key={day.title}>
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
            <div className="ts-day-body">
              <p>{day.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
