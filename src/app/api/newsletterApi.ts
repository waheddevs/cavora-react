import { baseApi } from "./baseApi"
import {
  NewsletterSubscriptionRequest,
  NewsletterSubscriptionResponse,
} from "app/types/newsletter"

export const newsletterApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    subscribeToNewsletter: builder.mutation<
      NewsletterSubscriptionResponse,
      NewsletterSubscriptionRequest
    >({
      query: body => ({
        url: "/newsletter-subscriptions",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: NewsletterSubscriptionResponse }) =>
        response.data,
    }),
  }),
})

export const { useSubscribeToNewsletterMutation } = newsletterApi
