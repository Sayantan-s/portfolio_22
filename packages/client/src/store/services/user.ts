import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { User } from "@store/types/auth";
import { IUpdateUser } from "@store/types/user";

export const userApi = createApi({
  reducerPath: "user-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/user",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("session_token")!
      )}`,
    },
  }),
  endpoints: (builder) => ({
    updateUserDetails: builder.mutation<Api.SuccessResponse<User>, IUpdateUser>(
      {
        query: ({ userId, details }) => ({
          method: "PATCH",
          url: userId,
          body: { details },
        }),
      }
    ),
  }),
});
