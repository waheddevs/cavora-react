import { Box, Slider } from "@mui/material"
import {
  durationBuckets,
  ratingOptions,
  tourTypes,
} from "app/data/tourFilterData"
import { useTourFilters } from "app/hooks/TourHooks/useTourFilters"

export default function FilterSidebar() {
  const {
    priceMin,
    priceMax,
    draft,
    setDraft,
    destinations,
    toggle,
    clearAll,
    applyFilters,
  } = useTourFilters()

  return (
    <aside className="tour-filters">
      <Box className="tf-head">
        <h3>Filters</h3>
        <button type="button" className="tf-clear" onClick={clearAll}>
          Clear all
        </button>
      </Box>

      <Box className="tf-group">
        <h4>Destination</h4>
        <ul className="tf-list">
          {destinations.map(destination => (
            <li key={destination.name}>
              <label>
                <input
                  type="checkbox"
                  checked={draft.destinations.includes(destination.name)}
                  onChange={() => toggle("destinations", destination.name)}
                />
                <span>{destination.name}</span>
              </label>
              <em>{destination.count}</em>
            </li>
          ))}
        </ul>
      </Box>

      <Box className="tf-group">
        <h4>Price Range</h4>
        <Slider
          className="tf-slider"
          value={draft.price}
          min={priceMin}
          max={priceMax}
          onChange={(_, v) =>
            setDraft(d => ({ ...d, price: v as [number, number] }))
          }
          valueLabelDisplay="auto"
        />
        <Box className="tf-price-labels">
          <span>${draft.price[0].toLocaleString()}</span>
          <span>${draft.price[1].toLocaleString()}</span>
        </Box>
      </Box>

      <Box className="tf-group">
        <h4>Duration</h4>
        <ul className="tf-list">
          {durationBuckets.map(bucket => (
            <li key={bucket.id}>
              <label>
                <input
                  type="checkbox"
                  checked={draft.durations.includes(bucket.id)}
                  onChange={() => toggle("durations", bucket.id)}
                />
                <span>{bucket.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </Box>

      <Box className="tf-group">
        <h4>Tour Type</h4>
        <ul className="tf-list">
          {tourTypes.map(type => (
            <li key={type}>
              <label>
                <input
                  type="checkbox"
                  checked={draft.types.includes(type)}
                  onChange={() => toggle("types", type)}
                />
                <span>{type}</span>
              </label>
            </li>
          ))}
        </ul>
      </Box>

      <Box className="tf-group">
        <h4>Min Rating</h4>
        <ul className="tf-list">
          {ratingOptions.map(rating => (
            <li key={rating.value}>
              <label>
                <input
                  type="radio"
                  name="min-rating"
                  checked={draft.minRating === rating.value}
                  onChange={() =>
                    setDraft(currentDraft => ({
                      ...currentDraft,
                      minRating: rating.value,
                    }))
                  }
                />
                <span>{rating.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </Box>

      <button type="button" className="tf-apply" onClick={applyFilters}>
        Apply Filters
      </button>
    </aside>
  )
}
