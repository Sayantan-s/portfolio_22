import { IPost } from "@store/types/posts";
import { motion } from "framer-motion";

const Post = ({ details, activity, id }: IPost) => {
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
      {" "}
      <span
        className={`block w-max float-right bg-teal-100/50 text-teal-400 px-3 py-1 capitalize rounded-full text-xs ${styles}`}
      >
        {activity}
      </span>
      <div className="flex space-x-2">
        <div className="w-10 h-10 rounded-full overflow-hidden relative">
          <img
            className="absolute w-full h-full object-cover"
            alt={`avatar_${id}`}
            src={
              "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            }
          />
        </div>
        <div>
          <h1 className="text-sm font-normal text-slate-500">David Lucca</h1>
          <p className="text-xs max-w-sm truncate text-slate-300">
            Software Engineer at Hoggy | NSEC'22 | Actively looking for Frontend
            roles
          </p>
        </div>
      </div>
      <div className="mt-3">
        <div>
          <h1
            className="text-slate-700 font-medium text-base"
            dangerouslySetInnerHTML={{ __html: details.heading }}
          />
          <p dangerouslySetInnerHTML={{ __html: details.body }} />
        </div>
      </div>
    </motion.div>
  );
};

export default Post;
