import { useWebS } from "@context/Ws";
import { useEffect } from "react";
import { PostTool } from "./PostTool";

export const Feed = () => {
  const { socket } = useWebS();

  useEffect(() => {
    socket.on("created_tweet", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="flex-[0.5]">
      <h1 className="text-slate-600 text-xl font-semibold">
        Hey, <span>Sayantan</span>
      </h1>
      <PostTool />
    </div>
  );
};
