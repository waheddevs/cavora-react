import { useEffect, useState } from "react"
import { Post } from "app/types/blog"
import { useGetPostsQuery } from "app/api/blogApi"

interface BlogPaginationState {
  page: number
  totalPages: number
  visiblePosts: Post[]
  handlePageChange: (page: number) => void
  handlePreviousPage: () => void
  handleNextPage: () => void
  isLoading: boolean
  isError: boolean
}

export function useBlogPagination(
  category: string,
  postsPerPage = 4,
): BlogPaginationState {
  /* STATE */
  const [page, setPage] = useState(1)

  /* API HOOKS */
  const postsQuery = useGetPostsQuery({
    page,
    limit: postsPerPage,
    ...(category === "All Posts" ? {} : { category }),
  })

  /* DERIVED DATA */
  const totalPages = Math.max(1, postsQuery.data?.meta.totalPages ?? 1)
  const visiblePosts = postsQuery.data?.data ?? []

  /* EFFECTS */
  useEffect(() => {
    setPage(1)
  }, [category])

  /* HANDLERS */
  const handlePageChange = (nextPage: number) => {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const handlePreviousPage = () => handlePageChange(page - 1)
  const handleNextPage = () => handlePageChange(page + 1)

  return {
    page,
    totalPages,
    visiblePosts,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    isLoading: postsQuery.isLoading,
    isError: postsQuery.isError,
  }
}
