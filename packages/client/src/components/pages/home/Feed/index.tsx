import { PostTool } from "./PostTool";

export const Feed = () => {
  return (
    <div className="flex-[0.5]">
      <h1 className="text-slate-600 text-xl font-semibold">
        Hey, <span>Sayantan</span>
      </h1>
      <PostTool />
    </div>
  );
};
