import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "@store/services/auth";
import Cookies from "universal-cookie";

type AuthState = {
  token: string | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.verify.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.data;
        const cookie = new Cookies();
        cookie.set("session", state.token);
      }
    );
  },
});

export default authSlice.reducer;
