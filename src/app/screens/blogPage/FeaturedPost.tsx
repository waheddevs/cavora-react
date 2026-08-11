import { Box } from "@mui/material"
import { useBlogNavigation } from "app/hooks/BlogHooks/useBlogNavigation"
import { useBlogSidebarData } from "app/hooks/BlogHooks/useBlogSidebarData"

export default function FeaturedPost() {
  /* HOOKS */
  const { openBlogPost } = useBlogNavigation()
  const { featuredPosts } = useBlogSidebarData()

  /* HANDLERS */
  const handleOpenPost = (postSlug: string | number) => openBlogPost(postSlug)
  return (
    <Box className="sidebar-widget">
      <h3 className="widget-title">Featured Post</h3>
      <Box className="feat-list">
        {featuredPosts.map(post => (
          <Box
            className="feat-item"
            key={post.id}
            onClick={() => handleOpenPost(post.slug ?? post.id)}
          >
            <img src={post.img} alt={post.title} loading="lazy" />
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
