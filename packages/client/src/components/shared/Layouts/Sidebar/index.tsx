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
    <aside className="flex-[0.2] border-r border-r-slate-100 px-4">
      <div className="mt-6">
        <div className="w-40 relative left-1/2 transform -translate-x-1/2">
          <Logo />
        </div>
        <div className="mt-14 space-y-10">
          <div className="space-y-6">
            <NavigationLink to="/" name="Feed" icon={Home} />
            <NavigationLink to="/profile" name="Profile" icon={Profile} />
            <NavigationLink to="/myjobs" name="My Jobs" icon={Briefcase} />
          </div>
          <div className="space-y-6">
            <NavigationLink
              to="/notifications"
              name="Notifications"
              icon={NotificationBing}
            />
            <NavigationLink to="/messages" name="Messages" icon={Messages1} />
          </div>
          <div className="space-y-6">
            <button className="bg-gradient-to-br w-full text-base from-sky-400 to-teal-400 disabled:opacity-75 text-slate-50 font-medium shadow-lg shadow-teal-400/30 p-2.5 rounded-full">
              Jweet
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
