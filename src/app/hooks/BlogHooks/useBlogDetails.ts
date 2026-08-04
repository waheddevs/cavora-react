import { FormEvent } from "react"
import { useSearchParams } from "react-router-dom"
import { getArticleBody, getPostById } from "app/data/blogDetailsData"
import { useBlogNavigation } from "./useBlogNavigation"

export function useBlogDetails() {
  const [searchParams] = useSearchParams()
  const { openBlogList } = useBlogNavigation()
  const post = getPostById(searchParams.get("id") ?? 1)
  const body = post ? getArticleBody(post) : []

  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return { post, body, openBlogList, handleCommentSubmit }
}
