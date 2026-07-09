import { Box } from "@mui/material"
import SendRoundedIcon from "@mui/icons-material/SendRounded"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import Categories from "./Categories"
import FeaturedPost from "./FeaturedPost"

interface Props {
  activeCategory: string
  onSelectCategory: (category: string) => void
}

export default function BlogSidebar({
  activeCategory,
  onSelectCategory,
}: Props) {
  return (
    <aside className="blog-sidebar">
      <Categories active={activeCategory} onSelect={onSelectCategory} />

      <FeaturedPost />

      {/* Subscribe */}
      <Box className="subscribe-widget">
        <div className="sub-icon">
          <SendRoundedIcon />
        </div>
        <h3>Explore new horizons with Cavora!</h3>
        <p>Get travel tips and inspiration delivered to your inbox weekly.</p>
        <form className="sub-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Your email address"
            aria-label="Your email address"
          />
          <button type="submit" className="sub-btn">
            Subscribe
            <ArrowForwardRoundedIcon />
          </button>
        </form>
      </Box>
    </aside>
  )
}
