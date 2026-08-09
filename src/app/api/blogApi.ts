import { baseApi } from "./baseApi"
import { ArticleBlock, Post } from "app/types/blog"

interface ApiBlogPostSummary {
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

interface ApiBlogPostDetail extends ApiBlogPostSummary {
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
  createdAt: string
}

interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

function adaptPost(post: ApiBlogPostSummary): Post {
  return {
    id: post.id,
    slug: post.slug,
    img: post.imageUrl,
    date: new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(post.publishedAt)),
    readTime: "7 min read",
    comments: post.commentCount,
    category: post.category,
    title: post.title,
    excerpt: post.excerpt,
    author: post.authorName,
    authorImg: post.authorImageUrl ?? "/img/team-img/member-1.jpg",
  }
}

export const blogApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query<
      { data: Post[]; meta: PaginationMeta },
      { page?: number; limit?: number; category?: string }
    >({
      query: params => ({ url: "/posts", params }),
      transformResponse: (response: {
        data: ApiBlogPostSummary[]
        meta: PaginationMeta
      }) => ({ ...response, data: response.data.map(adaptPost) }),
      providesTags: result => [
        { type: "Post", id: "LIST" },
        ...(result?.data.map(post => ({
          type: "Post" as const,
          id: post.id,
        })) ?? []),
      ],
    }),
    getPost: builder.query<BlogPostDetail, string>({
      query: slug => `/posts/${slug}`,
      transformResponse: (response: { data: ApiBlogPostDetail }) => ({
        ...adaptPost(response.data),
        body: response.data.body,
      }),
      providesTags: result => (result ? [{ type: "Post", id: result.id }] : []),
    }),
    getComments: builder.query<
      { data: BlogComment[]; meta: PaginationMeta },
      { postId: string; page?: number; limit?: number }
    >({
      query: ({ postId, ...params }) => ({
        url: `/posts/${postId}/comments`,
        params,
      }),
      providesTags: (_result, _error, query) => [
        { type: "Comment", id: query.postId },
      ],
    }),
    submitComment: builder.mutation<
      { id: string; message: string; status: string },
      { postId: string; name: string; email: string; body: string }
    >({
      query: ({ postId, ...body }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body,
      }),
      transformResponse: (response: {
        data: { id: string; message: string; status: string }
      }) => response.data,
    }),
  }),
})

export const {
  useGetCommentsQuery,
  useGetPostQuery,
  useGetPostsQuery,
  useSubmitCommentMutation,
} = blogApi
