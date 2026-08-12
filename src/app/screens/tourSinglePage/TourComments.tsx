import { Box } from "@mui/material"
import CommentSection from "app/components/comments/CommentSection"
import { useTourComments } from "app/hooks/TourSingleHooks/useTourComments"
import { useTourDetails } from "app/hooks/TourSingleHooks/useTourDetails"

export default function TourComments() {
  const { tour } = useTourDetails()
  const comments = useTourComments(tour?.id)
  if (!tour) return null

  return (
    <Box className="ts-card ts-comments-card">
      <CommentSection
        comments={comments.comments}
        total={comments.commentTotal}
        isLoading={comments.commentsLoading}
        onLoadMore={comments.loadMoreComments}
        onSubmit={comments.handleCommentSubmit}
        submitting={comments.commentSubmitting}
        hasError={comments.commentError}
        title="Traveler Comments"
      />
    </Box>
  )
}
