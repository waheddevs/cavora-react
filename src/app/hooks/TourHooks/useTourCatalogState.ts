import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import {
  SortKey,
  TourFilters,
  filterTours,
  makeDefaultFilters,
  sortTours,
} from "app/utils/tourFilters"
import { tourTypes } from "app/data/tourFilterData"
import { tours } from "app/data/tourData"

export function useTourCatalogState(toursPerPage = 9) {
  const priceMin = useMemo(() => Math.min(...tours.map(tour => tour.price)), [])
  const priceMax = useMemo(() => Math.max(...tours.map(tour => tour.price)), [])
  const [searchParams] = useSearchParams()
  const typeParam = searchParams.get("type")
  const defaultFilters = useMemo(() => {
    const nextFilters = makeDefaultFilters(priceMin, priceMax)

    if (typeParam && tourTypes.includes(typeParam)) {
      nextFilters.types = [typeParam]
    }

    return nextFilters
  }, [priceMin, priceMax, typeParam])
  const [filters, setFilters] = useState<TourFilters>(defaultFilters)
  const [sort, setSort] = useState<SortKey>("default")
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(true)
  const topRef = useRef<HTMLDivElement>(null)
  const filteredTours = useMemo(
    () => sortTours(filterTours(tours, filters), sort),
    [filters, sort],
  )
  const totalPages = Math.max(1, Math.ceil(filteredTours.length / toursPerPage))
  const pagedTours = filteredTours.slice(
    (page - 1) * toursPerPage,
    page * toursPerPage,
  )

  useEffect(() => {
    setFilters(defaultFilters)
  }, [defaultFilters])

  useEffect(() => {
    setPage(1)
  }, [filters, sort])

  const toggleFilters = () => setShowFilters(visible => !visible)
  const goToPage = (nextPage: number) => {
    setPage(nextPage)
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return {
    priceMin,
    priceMax,
    filters,
    setFilters,
    sort,
    setSort,
    page,
    showFilters,
    toggleFilters,
    topRef,
    filteredTours,
    pagedTours,
    totalPages,
    goToPage,
  }
}
