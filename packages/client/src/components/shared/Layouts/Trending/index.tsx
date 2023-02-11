import { authApi } from "@store/services/auth";
import { useNavigate } from "react-router";

export const Trending = () => {
  const [logout, { isLoading }] = authApi.useLogOutMutation();
  const navigate = useNavigate();

  const onLogOut = async () => {
    try {
      await logout().unwrap();
      navigate("/login");
    } catch (err) {}
  };

  return (
    <div className="flex-[0.3] sticky overflow-auto top-0">
      <div className="mt-6">Trending</div>
      <button disabled={isLoading} onClick={onLogOut} className="text-black">
        Logout
      </button>
    </div>
  );
};

export default Trending;
