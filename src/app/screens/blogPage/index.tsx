import { useState } from "react"
import { Box, Container } from "@mui/material"
import BlogList from "./BlogList"
import BlogSidebar from "./BlogSidebar"
import "css/blog.css"

export default function BlogPage() {
  /* HOOKS */
  const [activeCategory, setActiveCategory] = useState("All Posts")

  return (
    <Box className="blog-page">
      <Container maxWidth={false} className="blog-container">
        <Box className="blog-layout">
          <BlogList category={activeCategory} />
          <BlogSidebar
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </Box>
      </Container>
    </Box>
  )
}
