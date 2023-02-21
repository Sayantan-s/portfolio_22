import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@store";

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
          prepareHeaders: (headers, api) => {
            const { auth } = api.getState() as RootState;
            if (auth.access_token) {
              headers.set("X-ACCESS-TOKEN", auth.access_token);
            }
            if (auth.session_token) {
              headers.set("authorization", `Bearer ${auth.session_token}`);
            }
            headers.set("X-API-KEY", import.meta.env.VITE_API_KEY);
            return headers;
          },
        }
      : {}),
  });
