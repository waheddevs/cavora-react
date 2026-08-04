import { Box } from "@mui/material"
import { featuredPosts } from "app/data/blogData"
import { useBlogNavigation } from "app/hooks/BlogHooks/useBlogNavigation"

export default function FeaturedPost() {
  const { openBlogPost } = useBlogNavigation()
  return (
    <Box className="sidebar-widget">
      <h3 className="widget-title">Featured Post</h3>
      <Box className="feat-list">
        {featuredPosts.map(post => (
          <Box
            className="feat-item"
            key={post.id}
            onClick={() => openBlogPost(post.id)}
          >
            <img src={post.img} alt={post.title} />
            <Box className="feat-info">
              <h4>{post.title}</h4>
              <span>{post.date}</span>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
