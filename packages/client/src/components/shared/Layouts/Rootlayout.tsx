import { Page } from "@components/ui";
import { PropsWithChildren } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import Trending from "./Trending";

interface ILayoutProps {
  leftLayout?: JSX.Element;
  rightLayout?: JSX.Element;
}

const RootLayout = ({
  leftLayout,
  rightLayout,
}: PropsWithChildren<ILayoutProps>) => {
  return (
    <Page className="flex max-w-7xl mx-auto overflow-hidden">
      {leftLayout ? leftLayout : <Sidebar />}
      <main className="flex-[0.5] px-4 overflow-y-scroll">
        <div className="border-l border-l-slate-100">
          <Outlet />
        </div>
      </main>
      {rightLayout ? rightLayout : <Trending />}
    </Page>
  );
};

export default RootLayout;
