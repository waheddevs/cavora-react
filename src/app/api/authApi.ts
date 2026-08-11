import { baseApi, resolveApiAssetUrl } from "./baseApi"
import {
  ApiMember,
  LoginRequest,
  MessageResponse,
  PasswordChangeRequest,
  ProfileUpdateRequest,
  RegisterRequest,
} from "app/types/auth"
import { UserProfile } from "app/types/user"

function adaptMember(member: ApiMember): UserProfile {
  return {
    id: member.id,
    firstName: member.firstName,
    lastName: member.lastName,
    email: member.email,
    username: member.username,
    phone: member.phone ?? "",
    location: member.location ?? "",
    avatar:
      resolveApiAssetUrl(member.avatarUrl) || "/img/team-img/member-5.jpg",
    memberSince: new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(new Date(member.createdAt)),
    role: member.role,
    status: member.status,
    emailVerified: member.emailVerified,
    stats: member.stats ?? { activeSessions: 1, bookings: 0, wishlist: 0 },
  }
}

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => "/users/me",
      transformResponse: (response: { data: ApiMember }) =>
        adaptMember(response.data),
      providesTags: ["User"],
    }),
    login: builder.mutation<UserProfile, LoginRequest>({
      query: body => ({ url: "/auth/login", method: "POST", body }),
      transformResponse: (response: { data: ApiMember }) =>
        adaptMember(response.data),
      async onQueryStarted(_request, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(authApi.util.upsertQueryData("getProfile", undefined, data))
        } catch {
          return
        }
      },
      invalidatesTags: ["User", "Wishlist", "Booking"],
    }),
    register: builder.mutation<UserProfile, RegisterRequest>({
      query: body => ({ url: "/auth/register", method: "POST", body }),
      transformResponse: (response: { data: ApiMember }) =>
        adaptMember(response.data),
      async onQueryStarted(_request, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(authApi.util.upsertQueryData("getProfile", undefined, data))
        } catch {
          return
        }
      },
      invalidatesTags: ["User", "Wishlist", "Booking"],
    }),
    updateProfile: builder.mutation<UserProfile, ProfileUpdateRequest>({
      query: body => ({ url: "/users/me", method: "PATCH", body }),
      transformResponse: (response: { data: ApiMember }) =>
        adaptMember(response.data),
      async onQueryStarted(_request, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(authApi.util.upsertQueryData("getProfile", undefined, data))
        } catch {
          return
        }
      },
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation<MessageResponse, PasswordChangeRequest>({
      query: body => ({
        url: "/users/me/password",
        method: "POST",
        body,
      }),
    }),
    uploadAvatar: builder.mutation<UserProfile, File>({
      query: image => {
        const body = new FormData()
        body.append("image", image)

        return {
          url: "/users/me/avatar",
          method: "POST",
          body,
        }
      },
      transformResponse: (response: { data: ApiMember }) =>
        adaptMember(response.data),
      async onQueryStarted(_image, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(authApi.util.upsertQueryData("getProfile", undefined, data))
        } catch {
          return
        }
      },
      invalidatesTags: ["User"],
    }),
    removeAvatar: builder.mutation<UserProfile, void>({
      query: () => ({
        url: "/users/me/avatar",
        method: "DELETE",
      }),
      transformResponse: (response: { data: ApiMember }) =>
        adaptMember(response.data),
      async onQueryStarted(_argument, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(authApi.util.upsertQueryData("getProfile", undefined, data))
        } catch {
          return
        }
      },
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      async onQueryStarted(_argument, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(baseApi.util.resetApiState())
        } catch {
          return
        }
      },
    }),
  }),
})

export const useChangePasswordMutation = authApi.useChangePasswordMutation
export const useGetProfileQuery = authApi.useGetProfileQuery
export const useLoginMutation = authApi.useLoginMutation
export const useLogoutMutation = authApi.useLogoutMutation
export const useRegisterMutation = authApi.useRegisterMutation
export const useRemoveAvatarMutation = authApi.useRemoveAvatarMutation
export const useUpdateProfileMutation = authApi.useUpdateProfileMutation
export const useUploadAvatarMutation = authApi.useUploadAvatarMutation
