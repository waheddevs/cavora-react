import { Box, MenuItem, Select } from "@mui/material"
import TuneRoundedIcon from "@mui/icons-material/TuneRounded"
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded"
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
    <Box className="tour-topbar">
      <Box className="tour-topbar-left">
        <button type="button" className="filters-toggle" onClick={onToggleFilters}>
          <TuneRoundedIcon />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        <span className="tours-found">
          <strong>{count}</strong> Tours Found
        </span>
      </Box>

      <Box className="tour-sort">
        <span className="sort-label">Sort by:</span>
        <Select
          className="tour-sort-select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
          variant="standard"
          disableUnderline
          IconComponent={KeyboardArrowDownRoundedIcon}
          MenuProps={{
            classes: { paper: "tour-sort-menu" },
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
            transformOrigin: { vertical: "top", horizontal: "right" },
          }}
        >
          {sortOptions.map((o) => (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  )
}
