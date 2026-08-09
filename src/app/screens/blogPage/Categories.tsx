import { Box } from "@mui/material"
import AppsRoundedIcon from "@mui/icons-material/AppsRounded"
import { useBlogSidebarData } from "app/hooks/BlogHooks/useBlogSidebarData"

interface Props {
  active: string
  onSelect: (category: string) => void
}

export default function Categories({ active, onSelect }: Props) {
  /* HOOKS */
  const { categories, getCategoryCount } = useBlogSidebarData()

  /* HANDLERS */
  const handleSelectAll = () => onSelect("All Posts")
  const handleSelectCategory = (category: string) => onSelect(category)

  return (
    <Box className="sidebar-widget">
      <h3 className="widget-title">Categories</h3>
      <ul className="cat-list">
        <li
          className={`cat-item${active === "All Posts" ? " active" : ""}`}
          onClick={handleSelectAll}
        >
          <span>All Posts</span>
          <span className="cat-icon">
            <AppsRoundedIcon />
          </span>
        </li>

        {categories.map(label => (
          <li
            key={label}
            className={`cat-item${active === label ? " active" : ""}`}
            onClick={() => handleSelectCategory(label)}
          >
            <span>{label}</span>
            <span className="cat-count">{getCategoryCount(label)}</span>
          </li>
        ))}
      </ul>
    </Box>
  )
}
