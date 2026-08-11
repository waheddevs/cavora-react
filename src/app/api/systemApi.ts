import { baseApi } from "./baseApi"
import { OpenApiDocument, SystemHealth } from "app/types/system"

export const systemApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSystemHealth: builder.query<SystemHealth, void>({
      query: () => ({
        url: "/health",
        validateStatus: response =>
          response.status === 200 || response.status === 503,
      }),
      transformResponse: (response: { data: SystemHealth }) => response.data,
    }),
    getOpenApiDocument: builder.query<OpenApiDocument, void>({
      query: () => "/openapi.json",
    }),
  }),
})

export const useGetSystemHealthQuery = systemApi.useGetSystemHealthQuery
export const useLazyGetOpenApiDocumentQuery =
  systemApi.useLazyGetOpenApiDocumentQuery
