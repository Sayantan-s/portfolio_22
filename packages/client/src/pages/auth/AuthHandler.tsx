import { authApi } from "@store/services/auth";
import { Navigate, useSearchParams } from "react-router-dom";

export const AuthHandler = () => {
  const [params] = useSearchParams();
  const { isLoading, isError } = authApi.useVerifyQuery(
    params.get("token") as string
  );
  return isLoading ? (
    <div>Loading...</div>
  ) : isError ? (
    <div>Something wrong happend...</div>
  ) : (
    <Navigate to={"/"} />
  );
};
