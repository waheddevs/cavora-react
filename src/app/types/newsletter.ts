export type NewsletterSource = "HOMEPAGE" | "BLOG"

export interface NewsletterSubscriptionRequest {
  email: string
  source: NewsletterSource
}

export interface NewsletterSubscriptionResponse {
  message: string
  status: "ACTIVE" | "UNSUBSCRIBED"
  subscribed: boolean
}
