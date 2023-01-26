import { useAuth } from "@hooks";
import { Navigate, Outlet, useLocation } from "react-router";

export const UnProtectedRoutes = () => {
  const location = useLocation();
  const { isAuthencticated } = useAuth();
  if (isAuthencticated)
    return <Navigate to={"/"} state={{ from: location }} replace />;
  return <Outlet />;
};
