import { configureStore } from "@reduxjs/toolkit";
import * as rr from "react-redux";
import { authApi } from "./services/auth";
import { jweetsApi } from "./services/jweets";
import authReducer from "./slices/auth";
import jweetsReducer from "./slices/tweets";

const middlewares = [authApi.middleware, jweetsApi.middleware];

export const store = configureStore({
  reducer: {
    jweets: jweetsReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [jweetsApi.reducerPath]: jweetsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middlewares),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = rr.useDispatch;
export const useSelector: rr.TypedUseSelectorHook<RootState> = rr.useSelector;
