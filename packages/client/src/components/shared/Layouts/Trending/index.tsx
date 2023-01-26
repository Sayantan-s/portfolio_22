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
    <div className="flex-[0.3] bg-red-100">
      <div className="mt-6">Trending</div>
      <button
        disabled={isLoading}
        onClick={onLogOut}
        className="bg-red-400 text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Trending;
