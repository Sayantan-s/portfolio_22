import { useSSE } from "@hooks";
import { useDispatch } from "@store";
import { postsApi } from "@store/services/posts";
import { addPost } from "@store/slices/posts";
import { PostTool } from "./PostTool";

export const Feed = () => {
  const { isLoading, isSuccess, data } = postsApi.usePostsQuery();

  const dispatch = useDispatch();

  useSSE("posts", {
    onSuccess: (eve) => {
      dispatch(addPost(JSON.parse(eve.data)));
    },
  });

  return (
    <div className="mt-6">
      <h1 className="text-slate-800 text-xl font-semibold">
        Hey, <span className="text-xl text-slate-300">Sayantan</span>
      </h1>
      <PostTool />
      <div>
        {isLoading ? (
          <div className="text-sky-500">loading.....</div>
        ) : isSuccess ? (
          data.data.map((post) => (
            <div key={post.id}>
              <p dangerouslySetInnerHTML={{ __html: post.details.body }} />
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};
