import RootLayout from "@components/shared/Layouts/Rootlayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthHandler, Login } from "./auth";
import { Home } from "./home";
import { Jobs } from "./jobs";
import { Messages } from "./messages";
import { Notifications } from "./notifications";
import { Profile } from "./profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="login" element={<Login />} />
      <Route path="auth" element={<AuthHandler />} />
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="myjobs" element={<Jobs />} />
        <Route path="messages" element={<Messages />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Route>
  )
);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
