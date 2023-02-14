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
        {/* <div>Trending</div>
        <button disabled={isLoading} onClick={onLogOut} className="text-black">
          Logout
        </button> */}
        <div className="bg-slate-50 px-4 py-8 rounded-lg">
          <div className="space-y-2">
            <div className="w-20 h-20 rounded-full overflow-hidden relative  mx-auto">
              <img
                className="absolute w-full h-full object-cover"
                alt={`avatar`}
                src={
                  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                }
              />
            </div>
            <div className="text-center">
              <h1 className="text-lg font-normal text-slate-700">
                David Lucca{" "}
              </h1>
              <p className="text-xs max-w-sm text-slate-400 mt-1">
                Software Engineer at Hoggy | NSEC'22 | Actively looking for
                Frontend roles
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
