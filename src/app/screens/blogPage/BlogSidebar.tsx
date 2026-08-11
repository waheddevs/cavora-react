import { Box } from "@mui/material"
import SendRoundedIcon from "@mui/icons-material/SendRounded"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import Categories from "./Categories"
import FeaturedPost from "./FeaturedPost"
import { useNewsletterSubscription } from "app/hooks/CommonHooks/useNewsletterSubscription"

interface Props {
  activeCategory: string
  onSelectCategory: (category: string) => void
}

export default function BlogSidebar({
  activeCategory,
  onSelectCategory,
}: Props) {
  /* HOOKS */
  const { email, isSubmitting, handleEmailChange, handleSubmit } =
    useNewsletterSubscription("BLOG")

  return (
    <aside className="blog-sidebar">
      <Categories active={activeCategory} onSelect={onSelectCategory} />

      <FeaturedPost />

      <Box className="subscribe-widget">
        <Box className="sub-icon">
          <SendRoundedIcon />
        </Box>
        <h3>Explore new horizons with Cavora!</h3>
        <p>Get travel tips and inspiration delivered to your inbox weekly.</p>
        <form className="sub-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email address"
            aria-label="Your email address"
            value={email}
            onChange={handleEmailChange}
            disabled={isSubmitting}
            required
          />
          <button type="submit" className="sub-btn" disabled={isSubmitting}>
            {isSubmitting ? "Subscribing..." : "Subscribe"}
            <ArrowForwardRoundedIcon />
          </button>
        </form>
      </Box>
    </aside>
  )
}
