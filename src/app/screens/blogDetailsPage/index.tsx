import { Box, Container, Typography } from "@mui/material"
import { NavLink, useNavigate, useSearchParams } from "react-router-dom"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded"
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import BlogSidebar from "../blogPage/BlogSidebar"
import { getPostById, getArticleBody, comments } from "../../../js/BlogDetails"
import "../../../css/blog.css"

export default function BlogDetailsPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const post = getPostById(params.get("id") ?? 1)

  if (!post) {
    return (
      <div className="blog-details-page">
        <Container maxWidth={false} className="blog-container">
          <p className="details-empty">
            Post not found. <NavLink to="/blog">Back to Blog</NavLink>
          </p>
        </Container>
      </div>
    )
  }

  const body = getArticleBody(post)

  return (
    <div className="blog-details-page">
      <Container maxWidth={false} className="blog-container">
        <div className="blog-layout">
          {/* Article */}
          <article className="details-main">
            <div className="details-hero">
              <img src={post.img} alt={post.title} />
              <span className="details-badge">{post.category}</span>
            </div>

            <div className="blog-meta">
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
            </div>

            <Typography className="details-title">{post.title}</Typography>

            <div className="details-body">
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
                      {block.items?.map((item) => (
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
            </div>

            {/* Author box */}
            <Box className="details-author">
              <img src={post.authorImg} alt={post.author} />
              <div className="details-author-info">
                <span className="details-author-label">Written by</span>
                <h4>{post.author}</h4>
                <p>
                  Travel writer and photographer sharing honest stories from the
                  road — one destination, and one unexpected detour, at a time.
                </p>
              </div>
            </Box>

            {/* Comments */}
            <div className="details-comments">
              <h3 className="details-section-title">
                {comments.length} Comments
              </h3>
              <div className="comment-list">
                {comments.map((c) => (
                  <div className="comment-item" key={c.id}>
                    <img src={c.avatar} alt={c.name} />
                    <div className="comment-body">
                      <div className="comment-head">
                        <h5>{c.name}</h5>
                        <span>{c.date}</span>
                      </div>
                      <p>{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment form */}
              <h3 className="details-section-title">Leave a Comment</h3>
              <form
                className="comment-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="comment-form-row">
                  <input type="text" placeholder="Your name" aria-label="Your name" />
                  <input
                    type="email"
                    placeholder="Your email"
                    aria-label="Your email"
                  />
                </div>
                <textarea
                  rows={5}
                  placeholder="Write your comment..."
                  aria-label="Your comment"
                />
                <button type="submit" className="comment-submit">
                  Post Comment
                  <ArrowForwardRoundedIcon />
                </button>
              </form>
            </div>
          </article>

          {/* Sidebar (reused) */}
          <BlogSidebar
            activeCategory="All Posts"
            onSelectCategory={() => navigate("/blog")}
          />
        </div>
      </Container>
    </div>
  )
}
