import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postsApi } from "@store/services/posts";
import { InitialStateOfPosts, IPost } from "@store/types/posts";

const initialState: InitialStateOfPosts = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, { payload }) => {
      state.posts.push(payload);
    },
    getPosts: (
      state,
      { payload: { data } }: PayloadAction<Api.SuccessResponse<IPost[]>>
    ) => {
      state.posts = data;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      postsApi.endpoints.posts.matchFulfilled,
      postsSlice.caseReducers.getPosts
    );
  },
});

export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;
