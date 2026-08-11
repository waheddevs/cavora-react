import { Box, Container } from "@mui/material"
import BlogList from "./BlogList"
import BlogSidebar from "./BlogSidebar"
import { useBlogCategory } from "app/hooks/BlogHooks/useBlogCategory"
import "css/blog.css"

export default function BlogPage() {
  const { activeCategory, setActiveCategory } = useBlogCategory()

  return (
    <Box className="blog-page">
      <Container maxWidth={false} className="blog-container">
        <Box className="blog-layout">
          <BlogList key={activeCategory} category={activeCategory} />
          <BlogSidebar
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </Box>
      </Container>
    </Box>
  )
}
