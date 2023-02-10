import { sseStream } from "@helpers/httpClient";
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
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        let postSSEStream: ReturnType<typeof sseStream> | null = null;
        try {
          await cacheDataLoaded;
          postSSEStream = sseStream("posts", {
            // Need to handle errors
            onSuccess: (eve) => {
              updateCachedData((draft) => {
                draft.data.unshift(JSON.parse(eve.data));
              });
            },
          });
        } catch {
          await cacheEntryRemoved;
        }
        await cacheEntryRemoved;
        postSSEStream?.close();
      },
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
