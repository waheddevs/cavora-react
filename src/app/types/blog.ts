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

export interface ArticleBlock {
  type: "paragraph" | "heading" | "quote" | "list"
  text?: string
  author?: string
  items?: string[]
}
