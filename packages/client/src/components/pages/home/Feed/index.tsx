import { sseEvents } from "@helpers/httpClient";
import { postsApi } from "@store/services/posts";
import { useEffect } from "react";
import { PostTool } from "./PostTool";

export const Feed = () => {
  const { isLoading, isSuccess, data } = postsApi.usePostsQuery();

  useEffect(() => {
    sseEvents.addEventListener("post", (eve) => {
      console.log(eve);
    });

    sseEvents.onmessage = (eve) => {
      console.log(eve.data);
    };
    sseEvents.onerror = (eve) => {
      console.log(eve);
    };
    return () => {
      // sseEvents.close();
    };
  }, []);

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
