import { SetStateAction, useMemo, useState } from "react"
import { makeDefaultFilters } from "app/utils/tourFilters"
import { useTourCatalog } from "app/hooks/TourHooks/useTourCatalog"
import { TourFilters } from "app/types/tour"

type TourFilterListKey = "destinations" | "durations" | "types"

export function useTourFilters() {
  const { tours, priceMin, priceMax, filters, setFilters, topRef } =
    useTourCatalog()
  const [draftState, setDraftState] = useState({
    source: filters,
    value: filters,
  })
  const draft = draftState.source === filters ? draftState.value : filters
  const destinations = useMemo(() => {
    const counts: Record<string, number> = {}
    tours.forEach(tour => {
      counts[tour.country] = (counts[tour.country] || 0) + 1
    })

    return Object.entries(counts).map(([name, count]) => ({ name, count }))
  }, [tours])

  const setDraft = (action: SetStateAction<TourFilters>) => {
    setDraftState(current => {
      const currentDraft = current.source === filters ? current.value : filters
      return {
        source: filters,
        value:
          typeof action === "function" ? action(currentDraft) : action,
      }
    })
  }

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

  const applyFilters = () => {
    setFilters(draft)
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

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
