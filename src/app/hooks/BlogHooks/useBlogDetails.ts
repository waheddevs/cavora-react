import { FormEvent, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useBlogNavigation } from "./useBlogNavigation"
import {
  useGetCommentsQuery,
  useGetPostQuery,
  useSubmitCommentMutation,
} from "app/api/blogApi"

export function useBlogDetails() {
  const [commentLimit, setCommentLimit] = useState(4)
  /* ROUTER HOOKS */
  const [searchParams] = useSearchParams()

  /* DOMAIN HOOKS */
  const { openBlogList } = useBlogNavigation()

  /* API HOOKS */
  const slug = searchParams.get("slug") ?? ""
  const postQuery = useGetPostQuery(slug, { skip: !slug })
  const post = postQuery.data
  const commentsQuery = useGetCommentsQuery(
    { postId: String(post?.id ?? ""), page: 1, limit: commentLimit },
    { skip: !post },
  )
  const [submitComment, submitState] = useSubmitCommentMutation()

  useEffect(() => setCommentLimit(4), [post?.id])

  /* HANDLERS */
  const handleCommentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!post) return

    const form = event.currentTarget
    const values = new FormData(form)
    try {
      await submitComment({
        postId: String(post.id),
        name: String(values.get("name") ?? ""),
        email: String(values.get("email") ?? ""),
        body: String(values.get("body") ?? ""),
      }).unwrap()
      form.reset()
    } catch {
      return
    }
  }

  return {
    post,
    body: post?.body ?? [],
    comments: commentsQuery.data?.data ?? [],
    commentTotal: commentsQuery.data?.meta.total ?? 0,
    commentsLoading: commentsQuery.isFetching,
    loadMoreComments: () => setCommentLimit(current => current + 4),
    isLoading: postQuery.isLoading,
    isError: !slug || postQuery.isError,
    openBlogList,
    handleCommentSubmit,
    commentSubmitting: submitState.isLoading,
    commentError: submitState.isError,
  }
}
