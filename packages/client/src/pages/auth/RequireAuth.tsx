import { useAuth } from "@hooks";
import { Navigate, Outlet, useLocation } from "react-router";

export const RequireAuth = () => {
  const authState = localStorage.getItem("session_token");
  const location = useLocation();
  useAuth();
  if (!authState)
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  return <Outlet />;
};
