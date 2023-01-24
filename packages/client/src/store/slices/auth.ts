import { createSlice } from "@reduxjs/toolkit";
import { authApi, Session, User } from "@store/services/auth";

export type AuthState = {
  session_jwt: string | null;
  session_token: string | null;
  user: User | null;
  session?: Session | null;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    session_jwt: null || JSON.parse(localStorage.getItem("session_jwt")!),
    session_token: null || JSON.parse(localStorage.getItem("session_token")!),
    user: null || JSON.parse(localStorage.getItem("user")!),
    session: null || JSON.parse(localStorage.getItem("session")!),
  } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.verify.matchFulfilled,
      (state, { payload: { data } }) => {
        state.session_jwt = data.session_jwt;
        state.session_token = data.session_token;
        state.user = data.user;
        state.session = data.session;
        for (let [key, value] of Object.entries(data)) {
          localStorage.setItem(key, JSON.stringify(value));
        }
      }
    );
  },
});

export default authSlice.reducer;
