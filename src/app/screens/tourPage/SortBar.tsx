import { Box, MenuItem, Select } from "@mui/material"
import TuneRoundedIcon from "@mui/icons-material/TuneRounded"
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded"
import { sortOptions } from "app/data/tourFilterData"
import { SortKey } from "app/utils/tourFilters"
import { useTourCatalog } from "app/hooks/TourHooks/useTourCatalog"

export default function SortBar() {
  const { filteredTours, showFilters, toggleFilters, sort, setSort } =
    useTourCatalog()

  return (
    <Box className="tour-topbar">
      <Box className="tour-topbar-left">
        <button
          type="button"
          className="filters-toggle"
          onClick={toggleFilters}
        >
          <TuneRoundedIcon />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        <span className="tours-found">
          <strong>{filteredTours.length}</strong> Tours Found
        </span>
      </Box>

      <Box className="tour-sort">
        <span className="sort-label">Sort by:</span>
        <Select
          className="tour-sort-select"
          value={sort}
          onChange={event => setSort(event.target.value as SortKey)}
          variant="standard"
          disableUnderline
          IconComponent={KeyboardArrowDownRoundedIcon}
          MenuProps={{
            classes: { paper: "tour-sort-menu" },
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
            transformOrigin: { vertical: "top", horizontal: "right" },
          }}
        >
          {sortOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  )
}
