import { cookie } from "@hooks";
import { Navigate, Outlet, useLocation } from "react-router";

export const RequireAuth = () => {
  const authState = cookie.get("session");
  const location = useLocation();
  if (!authState)
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  return <Outlet />;
};
