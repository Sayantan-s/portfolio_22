import { Logo } from "@components/shared";
import { Home } from "iconsax-react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="flex-[0.15] border-r border-r-slate-100">
      <div className="mt-6 ">
        <Logo />
        <div>
          <NavLink to="/" className={"flex space-x-4"}>
            <Home className="w-6 h-6 stroke-slate-300" variant="Broken" />
            <span className="text-slate-400 text-lg">Feed</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};
