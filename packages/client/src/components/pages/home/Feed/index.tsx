import { PostTool } from "./PostTool";

export const Feed = () => {
  const onTweet = (html?: string) => {
    console.log(html);
  };

  return (
    <div className="flex-[0.5]">
      <h1 className="text-slate-600 text-xl font-semibold">
        Hey, <span>Sayantan</span>
      </h1>
      <PostTool onTweet={onTweet} />
    </div>
  );
};
