import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "@store/services/auth";
import { userApi } from "@store/services/user";
import { Session, User, VerifyApiPayload } from "@store/types/auth";

export interface AuthState {
  session_jwt: string | null;
  session_token: string | null;
  user: User | null;
  session?: Session | null;
}

const initialState: AuthState = {
  session_jwt: null || JSON.parse(localStorage.getItem("session_jwt")!),
  session_token: null || JSON.parse(localStorage.getItem("session_token")!),
  user: null || JSON.parse(localStorage.getItem("user")!),
  session: null || JSON.parse(localStorage.getItem("session")!),
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
      state.session_jwt = data.session_jwt;
      state.session_token = data.session_token;
      state.session = data.session;
      state.user = data.user;
      for (let [key, value] of Object.entries(data)) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    removeCredentials: (state) => {
      for (let key of Object.keys(state)) {
        localStorage.removeItem(key);
      }
      state.session = null;
      state.session_jwt = null;
      state.session_token = null;
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
  },
});

export default authSlice.reducer;
