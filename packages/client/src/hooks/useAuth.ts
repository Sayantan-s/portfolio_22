import { useSelector } from "@store";
import moment from "moment";
import { useMemo } from "react";

export const useAuth = () => {
  const authState = useSelector((state) => state.auth);
  const isAuthencticated = useMemo(() => {
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
