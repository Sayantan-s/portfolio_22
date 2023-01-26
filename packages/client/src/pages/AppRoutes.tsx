import RootLayout from "@components/shared/Layouts/Rootlayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthHandler, Login, RequireAuth, UnProtectedRoutes } from "./auth";
import { ErrorPage } from "./error";
import { Home } from "./home";
import { Jobs } from "./jobs";
import { Messages } from "./messages";
import { Notifications } from "./notifications";
import { Profile } from "./profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<UnProtectedRoutes />}>
        <Route path="login" element={<Login />} />
        <Route path="auth" element={<AuthHandler />} />
      </Route>
      <Route element={<RootLayout />}>
        <Route element={<RequireAuth />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="myjobs" element={<Jobs />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
