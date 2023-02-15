import { useUser } from "@hooks";
import { Navigate, Outlet } from "react-router";

export const RequireUserDetails = () => {
  const user = useUser();
  if (user?.newUser) return <Navigate to="/details" />;
  return <Outlet />;
};
