import { cookie } from "./useCookies";

export const useAuth = () => {
  const c = cookie.get("session");
};
