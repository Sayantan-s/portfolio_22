import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "@store/services/auth";
import { userApi } from "@store/services/user";
import { Session, User, VerifyApiPayload } from "@store/types/auth";

export interface AuthState {
  session_jwt: string | null;
  session_token: string | null;
  user: User | null;
  session?: Session | null;
  access_token: string | null;
}

const parser = (val: string) => JSON.parse(localStorage.getItem(val)!);

const initialState: AuthState = {
  session_jwt: parser("session_jwt"),
  session_token: parser("session_token"),
  user: parser("user"),
  session: parser("session"),
  access_token: parser("access_token"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveCredentials: (
      state,
      {
        payload: { data },
      }: PayloadAction<Api.SuccessResponse<VerifyApiPayload>>
    ) => {
      if (data.access_token) {
        state.access_token = data.access_token;
      } else {
        state.session_jwt = data.session_jwt;
        state.session_token = data.session_token;
        state.session = data.session;
      }
      for (let [key, value] of Object.entries(data)) {
        value && localStorage.setItem(key, JSON.stringify(value));
      }
      state.user = data.user;
    },
    removeCredentials: (state) => {
      if (state.access_token) {
        state.access_token = null;
      } else {
        state.session = null;
        state.session_jwt = null;
        state.session_token = null;
      }
      for (let key in state) {
        localStorage.removeItem(key);
      }
      state.user = null;
    },
    updateUser: (
      state,
      { payload: { data } }: PayloadAction<Api.SuccessResponse<User>>
    ) => {
      state.user = data;
      localStorage.setItem("user", JSON.stringify(data));
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.verify.matchFulfilled,
      authSlice.caseReducers.saveCredentials
    );
    builder.addMatcher(
      authApi.endpoints.logOut.matchFulfilled,
      authSlice.caseReducers.removeCredentials
    );
    builder.addMatcher(
      userApi.endpoints.updateUserDetails.matchFulfilled,
      authSlice.caseReducers.updateUser
    );
    builder.addMatcher(
      authApi.endpoints.easy.matchFulfilled,
      authSlice.caseReducers.saveCredentials
    );
  },
});

export default authSlice.reducer;
