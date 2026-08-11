import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const API_URL =
  process.env.REACT_APP_API_URL?.replace(/\/$/, "") ??
  "http://localhost:3008/cavora"

export function resolveApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${API_URL}${normalizedPath}`
}

function readCookie(name: string) {
  if (typeof document === "undefined") return undefined

  const prefix = `${encodeURIComponent(name)}=`
  const cookie = document.cookie
    .split("; ")
    .find(item => item.startsWith(prefix))

  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : undefined
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
    prepareHeaders: headers => {
      const csrfToken = readCookie("cavora_csrf")
      if (csrfToken) headers.set("x-csrf-token", csrfToken)
      return headers
    },
  }),
  tagTypes: ["User", "Home", "Tour", "Wishlist", "Booking", "Post", "Comment"],
  endpoints: () => ({}),
})

export function resolveApiAssetUrl(path?: string) {
  if (!path || /^https?:\/\//i.test(path)) return path ?? ""
  if (!path.startsWith("/assets/") && !path.startsWith("/uploads/")) return path

  return `${new URL(API_URL).origin}${path}`
}
