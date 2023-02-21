import { RootState, store } from "@store";

export const getState = (key: keyof RootState) => store.getState()[key];
