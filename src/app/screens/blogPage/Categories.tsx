import { Box } from "@mui/material"
import AppsRoundedIcon from "@mui/icons-material/AppsRounded"
import { posts, categories } from "app/data/blogData"

interface Props {
  active: string
  onSelect: (category: string) => void
}

export default function Categories({ active, onSelect }: Props) {
  const countFor = (label: string) =>
    posts.filter(post => post.category === label).length

  return (
    <Box className="sidebar-widget">
      <h3 className="widget-title">Categories</h3>
      <ul className="cat-list">
        <li
          className={`cat-item${active === "All Posts" ? " active" : ""}`}
          onClick={() => onSelect("All Posts")}
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
            onClick={() => onSelect(label)}
          >
            <span>{label}</span>
            <span className="cat-count">{countFor(label)}</span>
          </li>
        ))}
      </ul>
    </Box>
  )
}
