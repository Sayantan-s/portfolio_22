import { useSelector } from "@store";
import moment from "moment";
import { useMemo } from "react";

export const useAuth = () => {
  const authState = useSelector((state) => state.auth);
  const isAuthencticated = useMemo(() => {
    if (authState.access_token) {
      const payload = JSON.parse(atob(authState.access_token.split(".")[1]))
        .exp as number;
      return (
        moment(payload * 1000).valueOf() > Date.now() && authState.access_token
      );
    }
    return (
      moment(authState.session?.expires_at).valueOf() > Date.now() &&
      authState.session_token
    );
  }, [authState]);
  return {
    isAuthencticated,
    ...authState,
  };
};
