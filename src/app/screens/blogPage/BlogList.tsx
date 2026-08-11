import { Box } from "@mui/material"
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded"
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded"
import BlogCard from "./BlogCard"
import { useBlogPagination } from "app/hooks/BlogHooks/useBlogPagination"

export default function BlogList({ category }: { category: string }) {
  /* HOOKS */
  const {
    page,
    totalPages,
    visiblePosts,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    isLoading,
    isError,
  } = useBlogPagination(category)

  return (
    <Box className="blog-list">
      <Box className="blog-cards" key={`${category}-${page}`}>
        {isLoading && <p>Loading posts...</p>}
        {isError && (
          <p>
            Our travel stories are temporarily off the map. More inspiration
            will be back shortly.
          </p>
        )}
        {visiblePosts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </Box>

      {totalPages > 1 && (
        <Box className="blog-pagination">
          <button
            type="button"
            className="page-btn arrow"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={handlePreviousPage}
          >
            <KeyboardArrowLeftRoundedIcon />
          </button>

          {Array.from(
            { length: totalPages },
            (_, pageIndex) => pageIndex + 1,
          ).map(pageNumber => (
            <button
              type="button"
              key={pageNumber}
              className={`page-btn${pageNumber === page ? " active" : ""}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}

          <button
            type="button"
            className="page-btn arrow"
            aria-label="Next page"
            disabled={page === totalPages}
            onClick={handleNextPage}
          >
            <KeyboardArrowRightRoundedIcon />
          </button>
        </Box>
      )}
    </Box>
  )
}
