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
    baseUrl: `${import.meta.env.VITE_SERVER_ORIGIN}/api/jweets`,
  }),
  endpoints: (builder) => ({
    jweets: builder.query<IJweetsApiResponse, string>({
      query: () => "/",
    }),
  }),
});
