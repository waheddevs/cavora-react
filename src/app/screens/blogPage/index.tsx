import { useState } from "react"
import { Container } from "@mui/material"
import BlogList from "./BlogList"
import BlogSidebar from "./BlogSidebar"
import "../../../css/blog.css"

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Posts")

  return (
    <div className="blog-page">
      <Container maxWidth={false} className="blog-container">
        <div className="blog-layout">
          <BlogList category={activeCategory} />
          <BlogSidebar
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>
      </Container>
    </div>
  )
}
