import { useGetPostsQuery } from "app/api/blogApi"

export function useBlogSidebarData() {
  /* API HOOKS */
  const postsQuery = useGetPostsQuery({ page: 1, limit: 50 })

  /* DERIVED DATA */
  const posts = postsQuery.data?.data ?? []
  const categories = [...new Set(posts.map(post => post.category))]
  const featuredPosts = posts.slice(0, 3)

  /* HELPERS */
  const getCategoryCount = (category: string) =>
    posts.filter(post => post.category === category).length

  return {
    categories,
    featuredPosts,
    getCategoryCount,
  }
}
