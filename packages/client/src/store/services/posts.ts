import { sseStream } from "@helpers/httpClient";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IPost, TCreatePost } from "@store/types/posts";
import { baseQuery } from ".";

export const postsApi = createApi({
  reducerPath: "posts-api",
  baseQuery: baseQuery({
    url: "/posts",
    authHeaders: true,
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
