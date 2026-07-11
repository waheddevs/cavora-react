import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { featuredPosts } from "js/Blog"

export default function FeaturedPost() {
  const navigate = useNavigate()
  return (
    <Box className="sidebar-widget">
      <h3 className="widget-title">Featured Post</h3>
      <Box className="feat-list">
        {featuredPosts.map((post) => (
          <Box
            className="feat-item"
            key={post.id}
            onClick={() => navigate(`/blog-details?id=${post.id}`)}
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
