import { IPost } from "@store/types/posts";
import { motion } from "framer-motion";

const Post = ({ details, activity }: IPost) => {
  const styles =
    activity === "promote"
      ? "bg-teal-100/50 text-teal-400"
      : "bg-sky-100/50 text-sky-400";

  return (
    <motion.div
      initial={{ y: -5, opacity: 0.4 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 0.4 } }}
      className="p-3 rounded-xl bg-slate-50/70"
    >
      <span
        className={`block w-max float-right bg-teal-100/50 text-teal-400 px-3 py-1 capitalize rounded-full text-xs ${styles}`}
      >
        {activity}
      </span>
      <div>
        <h1
          className="text-slate-600 font-medium text-base"
          dangerouslySetInnerHTML={{ __html: details.heading }}
        />
        <p dangerouslySetInnerHTML={{ __html: details.body }} />
      </div>
    </motion.div>
  );
};

export default Post;
