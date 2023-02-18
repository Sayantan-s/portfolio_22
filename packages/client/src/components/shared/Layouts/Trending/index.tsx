import { useUser } from "@hooks";
import { NavLink } from "react-router-dom";
import Searchbar from "./Searchbar";

export const Trending = () => {
  const user = useUser();

  return (
    <div className="flex-[0.3] h-full">
      <div className="py-4 space-y-3 h-full">
        <Searchbar />
        <div className="bg-slate-50 px-6 py-8 rounded-lg">
          <div className="space-y-2">
            <div className="w-20 h-20 rounded-full overflow-hidden relative  mx-auto">
              <img
                className="absolute w-full h-full object-cover bg-slate-100"
                alt={`avatar`}
                src={user?.details?.profile_pic}
              />
            </div>
            <div className="text-center">
              <NavLink
                to={"/profile/" + user?.id}
                className="text-lg font-normal text-slate-700"
              >
                {user?.details?.first_name} {user?.details?.last_name}{" "}
              </NavLink>
              <p className="text-xs font-normal max-w-sm text-slate-500 mt-2">
                {user?.details?.headline}
              </p>
              <p className="line-clamp-3 text-[10px] mt-3">
                {user?.details?.about}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
