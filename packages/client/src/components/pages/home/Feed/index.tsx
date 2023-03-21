import { postsApi } from "@store/services/posts";
import { AnimatePresence, motion } from "framer-motion";
import Post from "./Post";
import PostFallbackLoading from "./Post/Fallback";
import { PostTool } from "./PostTool";

export const Feed = () => {
  const { isLoading, isSuccess, data } = postsApi.usePostsQuery();

  return (
    <div>
      <h1 className="p-4 text-slate-800 text-xl font-semibold sticky top-0 z-10 bg-white/70 backdrop-blur-xl">
        Hey, <span className="text-xl text-slate-300">Sayantan</span>
      </h1>
      <PostTool />
      <motion.div className="mt-4 space-y-3 pl-4">
        <AnimatePresence initial={false}>
          {isLoading ? (
            <PostFallbackLoading value={3} />
          ) : isSuccess ? (
            data.data.map((post) => <Post key={post.id} {...post} />)
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
