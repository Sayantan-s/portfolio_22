import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest, VerifyApiPayload } from "@store/types/auth";

export const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
    credentials: "include",
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
