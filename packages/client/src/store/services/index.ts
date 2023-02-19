import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type QueryArgs = Omit<
  FetchBaseQueryArgs,
  "baseUrl" | "headers" | "prepareHeaders"
> & {
  url: string;
  authHeaders?: boolean;
};

export const baseQuery = ({ url, authHeaders = false, ...rest }: QueryArgs) =>
  fetchBaseQuery({
    ...rest,
    baseUrl: `/api${url}`,
    credentials: "include",
    headers: {
      "X-API-KEY": import.meta.env.VITE_API_KEY,
    },
    ...(authHeaders
      ? {
          prepareHeaders: (headers) => {
            if (localStorage.getItem("access_token")) {
              headers.set(
                "X-ACCESS-TOKEN",
                localStorage.getItem("access_token")!
              );
            }
            if (localStorage.getItem("session_token")) {
              headers.set(
                "authorization",
                `Bearer ${JSON.parse(localStorage.getItem("session_token")!)}`
              );
            }
            return headers;
          },
        }
      : {}),
  });
