import { useState } from "react"

export function useBlogCategory() {
  const [activeCategory, setActiveCategory] = useState("All Posts")

  return { activeCategory, setActiveCategory }
}
