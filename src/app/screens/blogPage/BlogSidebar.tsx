import { Box } from "@mui/material"
import SendRoundedIcon from "@mui/icons-material/SendRounded"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import { featuredPosts } from "../../../js/Blog"
import Categories from "./Categories"

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

      {/* Featured Post */}
      <div className="sidebar-widget">
        <h3 className="widget-title">Featured Post</h3>
        <div className="feat-list">
          {featuredPosts.map((post) => (
            <div className="feat-item" key={post.title}>
              <img src={post.img} alt={post.title} />
              <div className="feat-info">
                <h4>{post.title}</h4>
                <span>{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

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
