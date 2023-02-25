import { RootState, store } from "@store";

export const getState = (key: keyof RootState): RootState[typeof key] =>
  store.getState()[key];
