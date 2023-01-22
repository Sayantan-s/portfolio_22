import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LoginRequest {
  name: string;
  email: string;
}

export interface TransformedLoginApiResponse {
  status: number | undefined;
}

export interface TransformedVerifyApiResponse {
  data: any;
}

export const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_ORIGIN + "/api/auth",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<TransformedLoginApiResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      transformResponse(_, meta) {
        return { status: meta?.response?.status };
      },
    }),
    verify: builder.query<TransformedVerifyApiResponse, string>({
      query: (token) => ({
        url: "verify",
        credentials: "include",
        headers: {
          "X-Magic-Token": token,
        },
      }),
    }),
  }),
});
