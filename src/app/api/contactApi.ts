import { baseApi } from "./baseApi"
import {
  ContactMessageRequest,
  ContactMessageResponse,
} from "app/types/contact"

export const contactApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    submitContactMessage: builder.mutation<
      ContactMessageResponse,
      ContactMessageRequest
    >({
      query: body => ({
        url: "/contact-messages",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: ContactMessageResponse }) =>
        response.data,
    }),
  }),
})

export const { useSubmitContactMessageMutation } = contactApi
