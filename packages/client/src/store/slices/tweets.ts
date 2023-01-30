import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jweetsApi } from "@store/services/jweets";

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
  name: "jweets",
  initialState,
  reducers: {
    addJweet: (state, { payload }) => {
      state.jweets.push(payload);
    },
    getJweets: (
      state,
      { payload: { data } }: PayloadAction<Api.SuccessResponse<IJweet[]>>
    ) => {
      state.jweets = data;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      jweetsApi.endpoints.jweets.matchFulfilled,
      jweetSlice.caseReducers.getJweets
    );
  },
});

export const { addJweet } = jweetSlice.actions;

export default jweetSlice.reducer;
