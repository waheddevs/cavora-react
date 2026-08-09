import { Box, Typography } from "@mui/material"
import GoldButton from "../../components/ui/GoldButton"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import PinterestIcon from "@mui/icons-material/Pinterest"
import { Post } from "app/types/blog"
import { useBlogNavigation } from "app/hooks/BlogHooks/useBlogNavigation"

export default function BlogCard({ post }: { post: Post }) {
  /* HOOKS */
  const { openBlogPost } = useBlogNavigation()

  /* HANDLERS */
  const handleReadMore = () => openBlogPost(post.slug ?? post.id)

  return (
    <Box className="blog-card">
      <Box className="blog-card-main">
        <Box className="blog-card-media">
          <img src={post.img} alt={post.title} />
        </Box>

        <Box className="blog-card-body">
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

          <Typography className="blog-card-title">{post.title}</Typography>
          <Typography className="blog-card-excerpt">{post.excerpt}</Typography>

          <GoldButton
            className="read-more-btn"
            endIcon={<ArrowForwardRoundedIcon />}
            onClick={handleReadMore}
          >
            Read More
          </GoldButton>
        </Box>
      </Box>

      <Box className="blog-card-footer">
        <Box className="blog-author">
          <img
            src={post.authorImg}
            alt={post.author}
            className="author-avatar"
          />
          <span>
            By <strong>{post.author}</strong>
          </span>
        </Box>

        <Box className="blog-card-socials">
          <button type="button" aria-label="Share on Facebook">
            <FacebookIcon />
          </button>
          <button type="button" aria-label="Share on Twitter">
            <TwitterIcon />
          </button>
          <button type="button" aria-label="Share on Pinterest">
            <PinterestIcon />
          </button>
        </Box>
      </Box>
    </Box>
  )
}
