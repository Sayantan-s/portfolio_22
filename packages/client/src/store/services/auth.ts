import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginRequest, VerifyApiPayload } from "@store/types/auth";
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
        headers: {
          "X-Magic-Token": token,
        },
      }),
    }),
    easy: builder.mutation<Api.SuccessResponse<VerifyApiPayload>, LoginRequest>(
      {
        query: (data) => ({
          url: "easy",
          body: data,
          method: "POST",
        }),
      }
    ),
    logOut: builder.mutation<Api.SuccessResponseNoPayload, void>({
      query: () => ({
        method: "DELETE",
        url: "logout",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("session_token")!
          )}`,
        },
        body: {
          session_id:
            JSON.parse(localStorage.getItem("session")!).session_id || "",
        },
      }),
    }),
  }),
});
