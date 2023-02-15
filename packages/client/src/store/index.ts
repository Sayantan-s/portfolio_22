import { configureStore } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import * as rr from "react-redux";
import { authApi } from "./services/auth";
import { postsApi } from "./services/posts";
import { userApi } from "./services/user";
import authReducer from "./slices/auth";
import jweetsReducer from "./slices/posts";

const middlewares = [
  authApi.middleware,
  postsApi.middleware,
  userApi.middleware,
];

export const store = configureStore({
  reducer: {
    jweets: jweetsReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middlewares),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = rr.useDispatch;
export const useSelector: rr.TypedUseSelectorHook<RootState> = rr.useSelector;
export const getStore = (): ToolkitStore<RootState> => store;
