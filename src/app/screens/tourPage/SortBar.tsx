import TuneRoundedIcon from "@mui/icons-material/TuneRounded"
import { sortOptions } from "./filters"
import type { SortKey } from "./filters"

interface Props {
  count: number
  showFilters: boolean
  onToggleFilters: () => void
  sort: SortKey
  onSortChange: (key: SortKey) => void
}

export default function SortBar({
  count,
  showFilters,
  onToggleFilters,
  sort,
  onSortChange,
}: Props) {
  return (
    <div className="tour-topbar">
      <div className="tour-topbar-left">
        <button type="button" className="filters-toggle" onClick={onToggleFilters}>
          <TuneRoundedIcon />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        <span className="tours-found">
          <strong>{count}</strong> Tours Found
        </span>
      </div>

      <div className="tour-sort">
        <label htmlFor="tour-sort">Sort by:</label>
        <select
          id="tour-sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
