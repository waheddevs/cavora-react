import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Box, Container } from "@mui/material"
import SortBar from "./SortBar"
import FilterSidebar from "./FilterSidebar"
import TourCard from "./TourCard"
import TourPagination from "./TourPagination"
import { tours } from "js/TourSingle"
import { filterTours, sortTours, makeDefaultFilters, tourTypes } from "app/libs/filter/filters"
import type { TourFilters, SortKey } from "app/libs/filter/filters"
import type { Tour } from "app/libs/types"
import "css/tour.css"

const PER_PAGE = 9

export default function TourPage() {
  const allTours = tours as Tour[]
  const priceMin = useMemo(
    () => Math.min(...allTours.map((t) => t.price)),
    [allTours],
  )
  const priceMax = useMemo(
    () => Math.max(...allTours.map((t) => t.price)),
    [allTours],
  )

  const [searchParams] = useSearchParams()
  const typeParam = searchParams.get("type")

  // Build initial filters, pre-selecting a tour type from the URL (?type=Adventure)
  const initialFilters = useMemo(() => {
    const base = makeDefaultFilters(priceMin, priceMax)
    if (typeParam && tourTypes.includes(typeParam)) {
      base.types = [typeParam]
    }
    return base
  }, [priceMin, priceMax, typeParam])

  const [filters, setFilters] = useState<TourFilters>(initialFilters)
  const [sort, setSort] = useState<SortKey>("default")

  // Re-apply when the URL type param changes (e.g. clicking a footer tour type)
  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters])
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(true)
  const topRef = useRef<HTMLDivElement>(null)

  const goToPage = (p: number) => {
    setPage(p)
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const filtered = useMemo(
    () => sortTours(filterTours(allTours, filters), sort),
    [allTours, filters, sort],
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  useEffect(() => {
    setPage(1)
  }, [filters, sort])

  return (
    <Box className="tour-page">
      <Container maxWidth={false} className="tour-container">
        <Box ref={topRef} className="tour-top-anchor" />
        <SortBar
          count={filtered.length}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters((s) => !s)}
          sort={sort}
          onSortChange={setSort}
        />

        <Box className={`tour-layout${showFilters ? "" : " collapsed"}`}>
          {showFilters && (
            <FilterSidebar
              priceMin={priceMin}
              priceMax={priceMax}
              initialFilters={initialFilters}
              onApply={setFilters}
            />
          )}

          <Box className="tour-main">
            {paged.length ? (
              <Box className="tour-grid" key={`${page}-${sort}`}>
                {paged.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </Box>
            ) : (
              <p className="tour-empty">
                No tours match your filters. Try adjusting them.
              </p>
            )}

            <TourPagination
              page={page}
              totalPages={totalPages}
              onChange={goToPage}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
