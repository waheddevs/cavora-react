import { baseApi } from "./baseApi"
import { FaqSection } from "app/types/faq"

export const faqApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getFaqs: builder.query<FaqSection[], void>({
      query: () => "/faqs",
      transformResponse: (response: { data: FaqSection[] }) => response.data,
      providesTags: [{ type: "Faq", id: "LIST" }],
    }),
  }),
})

export const { useGetFaqsQuery } = faqApi
