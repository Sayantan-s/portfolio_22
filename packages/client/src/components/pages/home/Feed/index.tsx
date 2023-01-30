import { useWebS } from "@context/Ws";
import { useDispatch } from "@store";
import { jweetsApi } from "@store/services/jweets";
import { addJweet } from "@store/slices/tweets";
import { useEffect } from "react";
import { PostTool } from "./PostTool";

interface IJweet {
  id: string;
  slug: string;
  title: string;
  body: string;
  userId: string;
}

export const Feed = () => {
  const { socket } = useWebS();

  const { isLoading, isSuccess, data } = jweetsApi.useJweetsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("created_jweet", (data) => {
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
            <div key={jweet.id}>
              <p dangerouslySetInnerHTML={{ __html: jweet.body }} />
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};
