import { useNavigate } from "react-router-dom"

export interface BlogNavigation {
  openBlogPost: (postSlug: string | number) => void
  openBlogList: () => void
}

export function useBlogNavigation(): BlogNavigation {
  const navigate = useNavigate()

  const openBlogPost = (postSlug: string | number) =>
    navigate(`/blog-details?slug=${encodeURIComponent(postSlug)}`)
  const openBlogList = () => navigate("/blog")

  return { openBlogPost, openBlogList }
}
