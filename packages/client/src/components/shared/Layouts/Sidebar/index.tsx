import { Logo } from "@components/shared";
import { Button } from "@components/ui";
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
    <aside className="flex-[0.2] h-full">
      <div className="py-4 border-r h-full border-r-slate-100">
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
            <Button variant={"gradient"} size="full">
              Shoot
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};
