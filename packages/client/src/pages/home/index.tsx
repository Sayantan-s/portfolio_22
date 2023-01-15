import { Feed, Sidebar, Trending } from "@components/pages/home";
import { Page } from "@components/ui";

export const Home = () => {
  return (
    <Page className="flex gap-6 max-w-7xl mx-auto">
      <Sidebar />
      <Feed />
      <Trending />
    </Page>
  );
};
