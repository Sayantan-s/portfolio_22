import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginRequest, Session, VerifyApiPayload } from "@store/types/auth";
import { baseQuery } from ".";

export const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: baseQuery({
    url: "/auth",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<Api.SuccessResponseNoPayload, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    verify: builder.query<Api.SuccessResponse<VerifyApiPayload>, string>({
      query: (token) => ({
        url: "verify",
        credentials: "include",
        params: { token },
      }),
    }),
    easy: builder.mutation<Api.SuccessResponse<VerifyApiPayload>, LoginRequest>(
      {
        query: (credentials) => ({
          url: "easy",
          method: "POST",
          body: credentials,
        }),
      }
    ),
    logOut: builder.mutation<
      Api.SuccessResponseNoPayload,
      Pick<Session, "session_id">
    >({
      query: ({ session_id }) => ({
        method: "DELETE",
        url: "logout",
        credentials: "include",
        body: { session_id },
      }),
    }),
  }),
});
