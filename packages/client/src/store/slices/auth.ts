import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi, Session, User, VerifyApiPayload } from "@store/services/auth";

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
      state.user = data.user;
      state.session = data.session;
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
  },
});

export default authSlice.reducer;
