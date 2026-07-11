import { useMemo, useState } from "react"
import { Box, Slider } from "@mui/material"
import { tours } from "../../../js/TourSingle"
import {
  durationBuckets,
  ratingOptions,
  tourTypes,
  makeDefaultFilters,
} from "./filters"
import type { TourFilters } from "./filters"

interface Props {
  priceMin: number
  priceMax: number
  onApply: (f: TourFilters) => void
}

export default function FilterSidebar({ priceMin, priceMax, onApply }: Props) {
  const [draft, setDraft] = useState<TourFilters>(
    makeDefaultFilters(priceMin, priceMax),
  )

  const destinations = useMemo(() => {
    const counts: Record<string, number> = {}
    tours.forEach((t) => {
      counts[t.country] = (counts[t.country] || 0) + 1
    })
    return Object.entries(counts).map(([name, count]) => ({ name, count }))
  }, [])

  const toggle = (key: "destinations" | "durations" | "types", value: string) =>
    setDraft((d) => {
      const list = d[key]
      return {
        ...d,
        [key]: list.includes(value)
          ? list.filter((v) => v !== value)
          : [...list, value],
      }
    })

  const clearAll = () => {
    const reset = makeDefaultFilters(priceMin, priceMax)
    setDraft(reset)
    onApply(reset)
  }

  return (
    <aside className="tour-filters">
      <Box className="tf-head">
        <h3>Filters</h3>
        <button type="button" className="tf-clear" onClick={clearAll}>
          Clear all
        </button>
      </Box>

      {/* Destination */}
      <Box className="tf-group">
        <h4>Destination</h4>
        <ul className="tf-list">
          {destinations.map((d) => (
            <li key={d.name}>
              <label>
                <input
                  type="checkbox"
                  checked={draft.destinations.includes(d.name)}
                  onChange={() => toggle("destinations", d.name)}
                />
                <span>{d.name}</span>
              </label>
              <em>{d.count}</em>
            </li>
          ))}
        </ul>
      </Box>

      {/* Price Range */}
      <Box className="tf-group">
        <h4>Price Range</h4>
        <Slider
          className="tf-slider"
          value={draft.price}
          min={priceMin}
          max={priceMax}
          onChange={(_, v) =>
            setDraft((d) => ({ ...d, price: v as [number, number] }))
          }
          valueLabelDisplay="auto"
        />
        <Box className="tf-price-labels">
          <span>${draft.price[0].toLocaleString()}</span>
          <span>${draft.price[1].toLocaleString()}</span>
        </Box>
      </Box>

      {/* Duration */}
      <Box className="tf-group">
        <h4>Duration</h4>
        <ul className="tf-list">
          {durationBuckets.map((b) => (
            <li key={b.id}>
              <label>
                <input
                  type="checkbox"
                  checked={draft.durations.includes(b.id)}
                  onChange={() => toggle("durations", b.id)}
                />
                <span>{b.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </Box>

      {/* Tour Type */}
      <Box className="tf-group">
        <h4>Tour Type</h4>
        <ul className="tf-list">
          {tourTypes.map((t) => (
            <li key={t}>
              <label>
                <input
                  type="checkbox"
                  checked={draft.types.includes(t)}
                  onChange={() => toggle("types", t)}
                />
                <span>{t}</span>
              </label>
            </li>
          ))}
        </ul>
      </Box>

      {/* Min Rating */}
      <Box className="tf-group">
        <h4>Min Rating</h4>
        <ul className="tf-list">
          {ratingOptions.map((r) => (
            <li key={r.value}>
              <label>
                <input
                  type="radio"
                  name="min-rating"
                  checked={draft.minRating === r.value}
                  onChange={() => setDraft((d) => ({ ...d, minRating: r.value }))}
                />
                <span>{r.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </Box>

      <button type="button" className="tf-apply" onClick={() => onApply(draft)}>
        Apply Filters
      </button>
    </aside>
  )
}
