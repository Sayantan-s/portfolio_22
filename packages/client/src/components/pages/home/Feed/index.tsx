import { useWebS } from "@context/Ws";
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

  useEffect(() => {
    async function getJweets() {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_ORIGIN}/api/jweets`
      );
      const { data } = await res.json();
      setJweets(data);
    }
    getJweets();
  }, []);

  useEffect(() => {
    socket.on("created_jweet", (data) => {
      setJweets((prevState) => [data, ...prevState]);
    });
  }, []);

  return (
    <div className="flex-[0.5]">
      <div className="mt-6">
        <h1 className="text-slate-800 text-xl font-semibold">
          Hey, <span className="text-xl text-slate-300">Sayantan</span>
        </h1>
        <PostTool />
        <div>
          {jweets.map((jweet) => (
            <div key={jweet.id}>{JSON.stringify(jweet)}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
