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
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          // updateCachedData((draft) => {
          //   draft
          // });
          // Buisness logic
        } catch (err) {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        await cacheEntryRemoved;
        // close websocket connection
      },
    }),
    createPost: builder.mutation<Api.SuccessResponseNoPayload, TCreatePost>({
      query: () => "/",
    }),
  }),
});
