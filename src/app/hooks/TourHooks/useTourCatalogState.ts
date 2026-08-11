import { useMemo, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import {
  filterTours,
  makeDefaultFilters,
  sortTours,
} from "app/utils/tourFilters"
import { SortKey, TourFilters } from "app/types/tour"
import { tourTypes } from "app/data/tourFilterData"
import { useGetToursQuery } from "app/api/toursApi"

export function useTourCatalogState(toursPerPage = 9) {
  /* API HOOKS */
  const { data, isLoading, isFetching, isError } = useGetToursQuery({
    page: 1,
    limit: 50,
    sort: "popularity",
  })

  /* ROUTER HOOKS */
  const [searchParams] = useSearchParams()

  /* DERIVED DATA */
  const tours = useMemo(() => data?.data ?? [], [data?.data])
  const priceMin = useMemo(
    () => (tours.length ? Math.min(...tours.map(tour => tour.price)) : 0),
    [tours],
  )
  const priceMax = useMemo(
    () => (tours.length ? Math.max(...tours.map(tour => tour.price)) : 5000),
    [tours],
  )
  const typeParam = searchParams.get("type")
  const defaultFilters = useMemo(() => {
    const nextFilters = makeDefaultFilters(priceMin, priceMax)

    if (typeParam && tourTypes.includes(typeParam)) {
      nextFilters.types = [typeParam]
    }

    return nextFilters
  }, [priceMin, priceMax, typeParam])

  /* STATE */
  const [filterState, setFilterState] = useState({
    defaults: defaultFilters,
    value: defaultFilters,
  })
  const filters =
    filterState.defaults === defaultFilters
      ? filterState.value
      : defaultFilters
  const [sort, setSort] = useState<SortKey>("default")
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  /* FILTERED DATA */
  const filteredTours = useMemo(
    () => sortTours(filterTours(tours, filters), sort),
    [filters, sort, tours],
  )
  const totalPages = Math.max(1, Math.ceil(filteredTours.length / toursPerPage))
  const currentPage = Math.min(page, totalPages)
  const pagedTours = filteredTours.slice(
    (currentPage - 1) * toursPerPage,
    currentPage * toursPerPage,
  )

  /* HANDLERS */
  const handleToggleFilters = () => setShowFilters(visible => !visible)
  const setFilters = (nextFilters: TourFilters) => {
    setFilterState({ defaults: defaultFilters, value: nextFilters })
    setPage(1)
  }
  const handleSortChange = (nextSort: SortKey) => {
    setSort(nextSort)
    setPage(1)
  }
  const handlePageChange = (nextPage: number) => {
    setPage(nextPage)
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  const handlePreviousPage = () => handlePageChange(page - 1)
  const handleNextPage = () => handlePageChange(page + 1)

  return {
    tours,
    isLoading,
    isFetching,
    isError,
    priceMin,
    priceMax,
    filters,
    setFilters,
    sort,
    handleSortChange,
    page: currentPage,
    showFilters,
    handleToggleFilters,
    topRef,
    filteredTours,
    pagedTours,
    totalPages,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
  }
}
