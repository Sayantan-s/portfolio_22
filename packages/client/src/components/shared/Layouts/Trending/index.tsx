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
    <div className="flex-[0.3]">
      <div className="py-4 sticky top-0">
        <div>Trending</div>
        <button disabled={isLoading} onClick={onLogOut} className="text-black">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Trending;
