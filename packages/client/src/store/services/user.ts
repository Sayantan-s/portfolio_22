import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { User } from "@store/types/auth";
import { IUpdateUser } from "@store/types/user";
import { baseQuery } from ".";

export const userApi = createApi({
  reducerPath: "user-api",
  baseQuery: baseQuery({
    url: "/user",
    authHeaders: true,
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
