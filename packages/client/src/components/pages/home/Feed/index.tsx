import { postsApi } from "@store/services/posts";
import { AnimatePresence, motion } from "framer-motion";
import Post from "./Post";
import { PostTool } from "./PostTool";

export const Feed = () => {
  const { isLoading, isSuccess, data } = postsApi.usePostsQuery();

  return (
    <div className="mt-6">
      <h1 className="text-slate-800 text-xl font-semibold">
        Hey, <span className="text-xl text-slate-300">Sayantan</span>
      </h1>
      <PostTool />
      <motion.div className="mt-4 space-y-3">
        <AnimatePresence>
          {isLoading ? (
            <div className="text-sky-500">loading.....</div>
          ) : isSuccess ? (
            data.data.map((post) => <Post key={post.id} {...post} />)
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
