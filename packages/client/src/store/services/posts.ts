import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost, TCreatePost } from "@store/types/posts";

export const postsApi = createApi({
  reducerPath: "posts-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/posts`,
    prepareHeaders(headers) {
      if (localStorage.getItem("session_token")) {
        headers.set(
          "authorization",
          `Bearer ${JSON.parse(localStorage.getItem("session_token")!)}`
        );
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    posts: builder.query<Api.SuccessResponse<IPost[]>, void>({
      query: () => "/",
    }),
    createPost: builder.mutation<Api.SuccessResponseNoPayload, TCreatePost>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
