import { useEffect, useState } from "react"
import { Box } from "@mui/material"
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded"
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded"
import BlogCard from "./BlogCard"
import { posts } from "js/Blog"

const POSTS_PER_PAGE = 4

export default function BlogList({ category }: { category: string }) {
  const [page, setPage] = useState(1)

  const filtered =
    category === "All Posts"
      ? posts
      : posts.filter((post) => post.category === category)

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))

  // Reset to the first page whenever the category changes
  useEffect(() => {
    setPage(1)
  }, [category])

  const start = (page - 1) * POSTS_PER_PAGE
  const visiblePosts = filtered.slice(start, start + POSTS_PER_PAGE)

  const goToPage = (n: number) => {
    setPage(n)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <Box className="blog-list">
      <Box className="blog-cards" key={`${category}-${page}`}>
        {visiblePosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </Box>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box className="blog-pagination">
          <button
            type="button"
            className="page-btn arrow"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => goToPage(page - 1)}
          >
            <KeyboardArrowLeftRoundedIcon />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              type="button"
              key={n}
              className={`page-btn${n === page ? " active" : ""}`}
              onClick={() => goToPage(n)}
            >
              {n}
            </button>
          ))}

          <button
            type="button"
            className="page-btn arrow"
            aria-label="Next page"
            disabled={page === totalPages}
            onClick={() => goToPage(page + 1)}
          >
            <KeyboardArrowRightRoundedIcon />
          </button>
        </Box>
      )}
    </Box>
  )
}
