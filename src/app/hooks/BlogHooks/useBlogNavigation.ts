import { useNavigate } from "react-router-dom"

export interface BlogNavigation {
  openBlogPost: (postId: number) => void
  openBlogList: () => void
}

export function useBlogNavigation(): BlogNavigation {
  const navigate = useNavigate()

  const openBlogPost = (postId: number) =>
    navigate(`/blog-details?id=${postId}`)
  const openBlogList = () => navigate("/blog")

  return { openBlogPost, openBlogList }
}
