/* Blog domain types — shared by blogPage (and its cards) */

export interface Post {
  id: number
  img: string
  date: string
  readTime: string
  comments: number
  category: string
  title: string
  excerpt: string
  author: string
  authorImg: string
}

/* One templated content block inside a blog article body */
export interface ArticleBlock {
  type: "paragraph" | "heading" | "quote" | "list"
  text?: string
  author?: string
  items?: string[]
}
