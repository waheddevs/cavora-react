export interface Post {
  id: number | string
  slug?: string
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

export interface ApiBlogPostSummary {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  imageUrl: string
  authorName: string
  authorImageUrl?: string
  commentCount: number
  publishedAt: string
}

export interface ApiBlogPostDetail extends ApiBlogPostSummary {
  body: ArticleBlock[]
  updatedAt: string
}

export interface BlogPostDetail extends Post {
  body: ArticleBlock[]
}

export interface BlogComment {
  id: string
  memberId?: string
  name: string
  body: string
  /** Stars given by the guest. Tour reviews carry one; blog comments do not. */
  rating?: number
  createdAt: string
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}
