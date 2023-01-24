import { authApi } from "@store/services/auth";

export const Trending = () => {
  const [trigger, { isLoading }] = authApi.useLazyReauthQuery();
  const onReauth = async () => {
    await trigger().unwrap();
  };
  return (
    <div className="flex-[0.3] bg-red-100">
      <div className="mt-6">{isLoading ? "Refetching..." : "Trending"}</div>
      <button className="bg-red-400 text-white">Logout</button>
      <button onClick={onReauth}>REAUTH</button>
    </div>
  );
};

export default Trending;
