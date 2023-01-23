import { createSlice } from "@reduxjs/toolkit";
import { authApi, User } from "@store/services/auth";
import Cookies from "universal-cookie";

type AuthState = {
  session_jwt: string;
  session_token: string;
  user: User | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { session_jwt: "", session_token: "", user: null } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.verify.matchFulfilled,
      (state, { payload: { data } }) => {
        state.session_jwt = data.session_jwt;
        state.session_token = data.session_token;
        state.user = data.user;
        const cookie = new Cookies();
        cookie.set("session", state);
      }
    );
  },
});

export default authSlice.reducer;
