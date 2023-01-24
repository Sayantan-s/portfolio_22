import { useAuth } from "@hooks";
import { useSelector } from "@store";
import { Navigate, Outlet, useLocation } from "react-router";

export const RequireAuth = () => {
  const authState = localStorage.getItem("session_token");
  const location = useLocation();
  const s = useSelector((state) => state.auth.session);
  useAuth();
  if (!authState)
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  return <Outlet />;
};
