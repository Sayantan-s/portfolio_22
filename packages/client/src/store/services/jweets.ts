import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IJweet {
  id: string;
  slug: string;
  title: string;
  body: string;
  userId: string;
}

interface IJweetsApiResponse {
  data: IJweet[];
}

export const jweetsApi = createApi({
  reducerPath: "jweets-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/jweets`,
    prepareHeaders(headers) {
      if (localStorage.getItem("session_token")) {
        headers.set(
          "authorization",
          `Bearer ${JSON.parse(localStorage.getItem("session_token"))}`
        );
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    jweets: builder.query<IJweetsApiResponse, void>({
      query: () => "/",
    }),
  }),
});
