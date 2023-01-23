import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LoginRequest {
  name: string;
  email: string;
}

export interface TransformedLoginApiResponse {
  status: number | undefined;
}

export type User = {
  id: string;
  email: string;
  name: string | null;
  newUser: boolean | null;
};

export interface TransformedVerifyApiResponse {
  data: {
    session_jwt: string;
    session_token: string;
    user: User;
  };
}

export const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<TransformedLoginApiResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
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
