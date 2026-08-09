import { FormEvent } from "react"
import { useSearchParams } from "react-router-dom"
import { useBlogNavigation } from "./useBlogNavigation"
import {
  useGetCommentsQuery,
  useGetPostQuery,
  useSubmitCommentMutation,
} from "app/api/blogApi"

export function useBlogDetails() {
  /* ROUTER HOOKS */
  const [searchParams] = useSearchParams()

  /* DOMAIN HOOKS */
  const { openBlogList } = useBlogNavigation()

  /* API HOOKS */
  const slug = searchParams.get("slug") ?? ""
  const postQuery = useGetPostQuery(slug, { skip: !slug })
  const post = postQuery.data
  const commentsQuery = useGetCommentsQuery(
    { postId: String(post?.id ?? ""), page: 1, limit: 20 },
    { skip: !post },
  )
  const [submitComment, submitState] = useSubmitCommentMutation()

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
    isLoading: postQuery.isLoading,
    isError: !slug || postQuery.isError,
    openBlogList,
    handleCommentSubmit,
    commentSubmitting: submitState.isLoading,
    commentSubmitted: submitState.isSuccess,
    commentError: submitState.isError,
  }
}
