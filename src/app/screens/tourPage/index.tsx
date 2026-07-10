import { useEffect, useMemo, useRef, useState } from "react"
import { Container } from "@mui/material"
import SortBar from "./SortBar"
import FilterSidebar from "./FilterSidebar"
import TourCard from "./TourCard"
import TourPagination from "./TourPagination"
import { tours } from "../../../js/TourSingle"
import { filterTours, sortTours, makeDefaultFilters } from "./filters"
import type { TourFilters, SortKey } from "./filters"
import type { Tour } from "../tourSinglePage/types"
import "../../../css/tour.css"

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

  const [filters, setFilters] = useState<TourFilters>(() =>
    makeDefaultFilters(priceMin, priceMax),
  )
  const [sort, setSort] = useState<SortKey>("default")
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
    <div className="tour-page">
      <Container maxWidth={false} className="tour-container">
        <div ref={topRef} className="tour-top-anchor" />
        <SortBar
          count={filtered.length}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters((s) => !s)}
          sort={sort}
          onSortChange={setSort}
        />

        <div className={`tour-layout${showFilters ? "" : " collapsed"}`}>
          {showFilters && (
            <FilterSidebar
              priceMin={priceMin}
              priceMax={priceMax}
              onApply={setFilters}
            />
          )}

          <div className="tour-main">
            {paged.length ? (
              <div className="tour-grid" key={`${page}-${sort}`}>
                {paged.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
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
          </div>
        </div>
      </Container>
    </div>
  )
}
