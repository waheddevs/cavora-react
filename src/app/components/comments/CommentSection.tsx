import { Box } from "@mui/material"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded"
import { FormEvent } from "react"
import { BlogComment } from "app/types/blog"
import "css/comments.css"

interface CommentSectionProps {
  comments: BlogComment[]
  total: number
  isLoading?: boolean
  onLoadMore: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  submitting: boolean
  hasError: boolean
  title?: string
}

function getCommentAvatar(name: string) {
  const hash = Array.from(name).reduce(
    (value, character) => (value * 31 + character.charCodeAt(0)) >>> 0,
    0,
  )
  return `/img/team-img/member-${(hash % 16) + 1}.webp`
}

export default function CommentSection({
  comments,
  total,
  isLoading = false,
  onLoadMore,
  onSubmit,
  submitting,
  hasError,
  title = "Comments",
}: CommentSectionProps) {
  const hasMore = comments.length < total

  return (
    <Box className="community-comments">
      <h3 className="community-comments-title">
        {total} {title}
      </h3>

      {isLoading && comments.length === 0 && (
        <p className="community-comments-state">Loading comments...</p>
      )}

      {!isLoading && comments.length === 0 && (
        <p className="community-comments-state">
          Be the first traveler to share a thought.
        </p>
      )}

      <Box className="community-comment-list">
        {comments.map(comment => (
          <Box className="community-comment-item" key={comment.id}>
            <img
              src={getCommentAvatar(comment.name)}
              alt={comment.name}
              loading="lazy"
            />
            <Box className="community-comment-body">
              <Box className="community-comment-head">
                <h5>{comment.name}</h5>
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
              </Box>
              <p>{comment.body}</p>
            </Box>
          </Box>
        ))}
      </Box>

      {hasMore && (
        <button
          type="button"
          className="community-load-more"
          onClick={onLoadMore}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load more"}
          <KeyboardArrowDownRoundedIcon />
        </button>
      )}

      <h3 className="community-comments-title community-comments-form-title">
        Leave a Comment
      </h3>
      <form className="community-comment-form" onSubmit={onSubmit}>
        <Box className="community-comment-form-row">
          <input
            name="name"
            type="text"
            placeholder="Your name"
            aria-label="Your name"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your email"
            aria-label="Your email"
            required
          />
        </Box>
        <textarea
          name="body"
          rows={5}
          placeholder="Write your comment..."
          aria-label="Your comment"
          minLength={2}
          maxLength={5000}
          required
        />
        <button
          type="submit"
          className="community-comment-submit"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Post Comment"}
          <ArrowForwardRoundedIcon />
        </button>
        {hasError && (
          <p className="community-comment-feedback error">
            Comment could not be submitted. Please try again.
          </p>
        )}
      </form>
    </Box>
  )
}
