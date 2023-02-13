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
    <Page className="flex max-w-7xl mx-auto">
      {leftLayout ? leftLayout : <Sidebar />}
      <main className="flex-[0.5]">
        <Outlet />
      </main>
      {rightLayout ? rightLayout : <Trending />}
    </Page>
  );
};

export default RootLayout;
