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
      console.log(payload);
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
    builder.addMatcher(
      postsApi.endpoints.createPost.matchFulfilled,
      postsSlice.caseReducers.addPost
    );
  },
});

export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;
