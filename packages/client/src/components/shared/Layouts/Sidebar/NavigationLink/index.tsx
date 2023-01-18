import { NavLink, useLocation } from "react-router-dom";
import { INavProps } from "./type";

export const NavigationLink = ({ to, icon: Icon, name }: INavProps) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;
  return (
    <NavLink to={to} className={"flex hover:bg-slate-100 p-2"}>
      <div className="flex space-x-4 w-40 relative left-1/2 transform -translate-x-1/2">
        <Icon
          className={`w-6 h-6 ${
            isActive ? "fill-slate-900 stroke-slate-800" : "stroke-slate-300"
          }`}
          variant={isActive ? "Bulk" : "Broken"}
        />
        <span
          className={`${
            isActive ? "text-slate-800" : "text-slate-400"
          } text-lg`}
        >
          {name}
        </span>
      </div>
    </NavLink>
  );
};
