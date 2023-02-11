import { Logo } from "@components/shared";
import {
  Briefcase,
  Home,
  Messages1,
  NotificationBing,
  Profile,
} from "iconsax-react";
import { NavigationLink } from "./NavigationLink";

export const Sidebar = () => {
  return (
    <aside className="flex-[0.2] border-r border-r-slate-100">
      <div className="py-4 sticky top-0">
        <div className="w-48 relative left-1/2 transform -translate-x-1/2">
          <Logo />
        </div>
        <div className="mt-14 space-y-10">
          <div className="space-y-6">
            <NavigationLink to="/" name="Feed" icon={Home} />
            <NavigationLink
              to="/profile"
              name="Profile"
              icon={Profile}
              disabled
            />
            <NavigationLink
              to="/soldart"
              name="Sold"
              icon={Briefcase}
              disabled
            />
            <NavigationLink
              to="/boughtart"
              name="Bought"
              icon={Briefcase}
              disabled
            />
          </div>
          <div className="space-y-6">
            <NavigationLink
              to="/notifications"
              name="Notifications"
              icon={NotificationBing}
              disabled
            />
            <NavigationLink to="/messages" name="Messages" icon={Messages1} />
          </div>
          <div className="space-y-6 px-8">
            <button className="w-full bg-gradient-to-br text-base from-sky-400 to-teal-400 disabled:opacity-75 text-slate-50 font-medium ring-1 ring-teal-700/10 shadow-teal-400/30 p-2.5 rounded-full">
              Shoot
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
