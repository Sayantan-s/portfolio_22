import { createSlice } from "@reduxjs/toolkit";

interface IJweet {
  id: string;
  slug: string;
  title: string;
  body: string;
  userId: string;
}

interface InitialState {
  jweets: IJweet[];
}

const initialState: InitialState = {
  jweets: [],
};

export const jweetSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addJweet: (state, { payload }) => {
      state.jweets.unshift(payload);
    },
  },
});

export const { addJweet } = jweetSlice.actions;

export default jweetSlice.reducer;
