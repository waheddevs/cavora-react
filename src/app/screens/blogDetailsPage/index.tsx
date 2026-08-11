import { Box, Container, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded"
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import BlogSidebar from "../blogPage/BlogSidebar"
import { useBlogDetails } from "app/hooks/BlogHooks/useBlogDetails"
import "css/blog.css"

export default function BlogDetailsPage() {
  const {
    post,
    body,
    comments,
    commentTotal,
    isLoading,
    isError,
    openBlogList,
    handleCommentSubmit,
    commentSubmitting,
    commentSubmitted,
    commentError,
  } = useBlogDetails()

  if (isLoading) {
    return (
      <Box className="blog-details-page">
        <Container maxWidth={false} className="blog-container">
          <p className="details-empty">Loading post...</p>
        </Container>
      </Box>
    )
  }

  if (!post || isError) {
    return (
      <Box className="blog-details-page">
        <Container maxWidth={false} className="blog-container">
          <p className="details-empty">
            Post not found. <NavLink to="/blog">Back to Blog</NavLink>
          </p>
        </Container>
      </Box>
    )
  }

  return (
    <Box className="blog-details-page">
      <Container maxWidth={false} className="blog-container">
        <Box className="blog-layout">
          <article className="details-main">
            <Box className="details-hero">
              <img src={post.img} alt={post.title} />
              <span className="details-badge">{post.category}</span>
            </Box>

            <Box className="blog-meta">
              <span className="meta">
                <CalendarMonthOutlinedIcon />
                {post.date}
              </span>
              <span className="meta">
                <AccessTimeRoundedIcon />
                {post.readTime}
              </span>
              <span className="meta">
                <ChatBubbleOutlineRoundedIcon />
                {post.comments} Comments
              </span>
            </Box>

            <Typography className="details-title">{post.title}</Typography>

            <Box className="details-body">
              {body.map((block, i) => {
                if (block.type === "heading") {
                  return <h3 key={i}>{block.text}</h3>
                }
                if (block.type === "quote") {
                  return (
                    <blockquote key={i} className="details-quote">
                      <FormatQuoteRoundedIcon />
                      <p>{block.text}</p>
                      <cite>— {block.author}</cite>
                    </blockquote>
                  )
                }
                if (block.type === "list") {
                  return (
                    <ul key={i} className="details-list">
                      {block.items?.map(item => (
                        <li key={item}>
                          <CheckCircleRoundedIcon />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )
                }
                return <p key={i}>{block.text}</p>
              })}
            </Box>

            <Box className="details-author">
              <img src={post.authorImg} alt={post.author} loading="lazy" />
              <Box className="details-author-info">
                <span className="details-author-label">Written by</span>
                <h4>{post.author}</h4>
                <p>
                  Travel writer and photographer sharing honest stories from the
                  road — one destination, and one unexpected detour, at a time.
                </p>
              </Box>
            </Box>

            <Box className="details-comments">
              <h3 className="details-section-title">{commentTotal} Comments</h3>
              <Box className="comment-list">
                {comments.map(comment => (
                  <Box className="comment-item" key={comment.id}>
                    <img
                      src="/img/team-img/member-1.jpg"
                      alt={comment.name}
                      loading="lazy"
                    />
                    <Box className="comment-body">
                      <Box className="comment-head">
                        <h5>{comment.name}</h5>
                        <span>
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </Box>
                      <p>{comment.body}</p>
                    </Box>
                  </Box>
                ))}
              </Box>

              <h3 className="details-section-title">Leave a Comment</h3>
              <form className="comment-form" onSubmit={handleCommentSubmit}>
                <Box className="comment-form-row">
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
                  required
                />
                <button
                  type="submit"
                  className="comment-submit"
                  disabled={commentSubmitting}
                >
                  {commentSubmitting ? "Submitting..." : "Post Comment"}
                  <ArrowForwardRoundedIcon />
                </button>
                {commentSubmitted && (
                  <p>Your comment was submitted for moderation.</p>
                )}
                {commentError && <p>Comment could not be submitted.</p>}
              </form>
            </Box>
          </article>

          <BlogSidebar
            activeCategory="All Posts"
            onSelectCategory={openBlogList}
          />
        </Box>
      </Container>
    </Box>
  )
}
