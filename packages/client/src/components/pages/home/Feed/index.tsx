import { useWebS } from "@context/Ws";
import { useDispatch } from "@store";
import { jweetsApi } from "@store/services/jweets";
import { addJweet } from "@store/slices/tweets";
import { useEffect, useState } from "react";
import { PostTool } from "./PostTool";

interface IJweet {
  id: string;
  slug: string;
  title: string;
  body: string;
  userId: string;
}

export const Feed = () => {
  const [jweets, setJweets] = useState<IJweet[]>([]);

  const { socket } = useWebS();

  const { isLoading, isSuccess, data } = jweetsApi.useJweetsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("created_jweet", (data) => {
      console.log("DATA");
      dispatch(addJweet(data));
    });
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
          data.data.map((jweet) => (
            <div key={jweet.id}>{JSON.stringify(jweet)}</div>
          ))
        ) : null}
      </div>
    </div>
  );
};
