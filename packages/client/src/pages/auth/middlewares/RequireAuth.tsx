import { useAuth } from "@hooks";
import { Navigate, Outlet, useLocation } from "react-router";

export const RequireAuth = () => {
  const location = useLocation();
  const { isAuthencticated } = useAuth();
  if (!isAuthencticated)
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  return <Outlet />;
};
