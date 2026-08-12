import { FormEvent, useEffect, useState } from "react"
import {
  useGetTourCommentsQuery,
  useSubmitTourCommentMutation,
} from "app/api/toursApi"

export function useTourComments(tourId?: number) {
  const [commentLimit, setCommentLimit] = useState(4)
  const commentsQuery = useGetTourCommentsQuery(
    { tourId: tourId ?? 0, page: 1, limit: commentLimit },
    { skip: !tourId },
  )
  const [submitComment, submitState] = useSubmitTourCommentMutation()

  useEffect(() => setCommentLimit(4), [tourId])

  const handleCommentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!tourId) return

    const form = event.currentTarget
    const values = new FormData(form)
    try {
      await submitComment({
        tourId,
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
    comments: commentsQuery.data?.data ?? [],
    commentTotal: commentsQuery.data?.meta.total ?? 0,
    commentsLoading: commentsQuery.isFetching,
    loadMoreComments: () => setCommentLimit(current => current + 4),
    handleCommentSubmit,
    commentSubmitting: submitState.isLoading,
    commentError: submitState.isError,
  }
}
