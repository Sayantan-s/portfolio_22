import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const AuthHandler = () => {
  const [params] = useSearchParams();
  useEffect(() => {
    async function authenticate() {
      if (!params.get("token")) return;
      const res = await fetch(
        import.meta.env.VITE_SERVER_ORIGIN + "/api/auth/verify",
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-Magic-Token": params.get("token")!,
          },
        }
      );
      const session = await res.json();
      console.log(session);
    }
    authenticate();
  }, []);
  return <div>AuthHandler</div>;
};
