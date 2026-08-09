import { useEffect, useMemo, useState } from "react"
import { TourFilters, makeDefaultFilters } from "app/utils/tourFilters"
import { useTourCatalog } from "app/hooks/TourHooks/useTourCatalog"

export type TourFilterListKey = "destinations" | "durations" | "types"

export function useTourFilters() {
  const { tours, priceMin, priceMax, filters, setFilters } = useTourCatalog()
  const [draft, setDraft] = useState<TourFilters>(filters)
  const destinations = useMemo(() => {
    const counts: Record<string, number> = {}
    tours.forEach(tour => {
      counts[tour.country] = (counts[tour.country] || 0) + 1
    })

    return Object.entries(counts).map(([name, count]) => ({ name, count }))
  }, [tours])

  useEffect(() => {
    setDraft(filters)
  }, [filters])

  const toggle = (key: TourFilterListKey, value: string) => {
    setDraft(currentDraft => {
      const list = currentDraft[key]
      return {
        ...currentDraft,
        [key]: list.includes(value)
          ? list.filter(item => item !== value)
          : [...list, value],
      }
    })
  }

  const clearAll = () => {
    const resetFilters = makeDefaultFilters(priceMin, priceMax)
    setDraft(resetFilters)
    setFilters(resetFilters)
  }

  const applyFilters = () => setFilters(draft)

  return {
    priceMin,
    priceMax,
    draft,
    setDraft,
    destinations,
    toggle,
    clearAll,
    applyFilters,
  }
}
