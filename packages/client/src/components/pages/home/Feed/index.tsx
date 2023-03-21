import { feedRef } from "@/components/shared/Layouts/Rootlayout";
import { useWindowScroll } from "@/hooks";
import { postsApi } from "@store/services/posts";
import { motion } from "framer-motion";
import { useState } from "react";
import Post from "./Post";
import PostFallbackLoading from "./Post/Fallback";
import { PostTool } from "./PostTool";

export const Feed = () => {
  const { isLoading, isSuccess, data } = postsApi.usePostsQuery();

  const [showAdditionalStyles, setShowAdditionalStyles] = useState(false);

  useWindowScroll(feedRef, (target) => {
    setShowAdditionalStyles(target.scrollTop > 100);
  });

  const additionalStyles = showAdditionalStyles
    ? "after:translate-x-0 shadow-sm shadow-slate-100"
    : "after:-translate-x-full shadow-none";

  return (
    <div>
      <header
        className={`overflow-hidden after:content-[''] after:h-[1px] after:bg-slate-100 after:absolute after:bottom-0 sticky top-0 z-10 after:transition-transform after:w-full after:transform ${additionalStyles}`}
      >
        <h1 className="p-4 text-slate-800 text-xl font-semibold bg-white/70 backdrop-blur-xl">
          Hey, <span className="text-xl text-slate-300">Sayantan</span>
        </h1>
      </header>
      <PostTool />
      <motion.div className="mt-4 space-y-3 pl-4">
        {isLoading ? (
          <PostFallbackLoading value={3} />
        ) : isSuccess ? (
          data.data.map((post) => <Post key={post.id} {...post} />)
        ) : null}
      </motion.div>
    </div>
  );
};
