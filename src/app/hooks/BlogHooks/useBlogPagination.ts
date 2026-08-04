import { useEffect, useState } from "react"
import { Post } from "app/types/blog"
import { posts } from "app/data/blogData"

export interface BlogPaginationState {
  page: number
  totalPages: number
  visiblePosts: Post[]
  goToPage: (page: number) => void
}

export function useBlogPagination(
  category: string,
  postsPerPage = 4,
): BlogPaginationState {
  const [page, setPage] = useState(1)
  const filteredPosts =
    category === "All Posts"
      ? posts
      : posts.filter(post => post.category === category)
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage))
  const start = (page - 1) * postsPerPage
  const visiblePosts = filteredPosts.slice(start, start + postsPerPage)

  useEffect(() => {
    setPage(1)
  }, [category])

  const goToPage = (nextPage: number) => {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return { page, totalPages, visiblePosts, goToPage }
}
