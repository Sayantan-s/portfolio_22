import { configureStore } from "@reduxjs/toolkit";
import jweetsReducer from "./slices/tweets";

export const store = configureStore({
  reducer: {
    jweets: jweetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
