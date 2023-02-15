import RootLayout from "@components/shared/Layouts/Rootlayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { BoughtArtifacts, SoldArtifacts } from "./Artifacts";
import {
  AuthHandler,
  Login,
  RequireAuth,
  RequireUserDetails,
  UnProtectedRoutes,
  UserDetails,
} from "./auth";
import { ErrorPage } from "./error";
import { Home } from "./home";
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
      <Route path="details" element={<UserDetails />} />
      <Route element={<RootLayout />}>
        <Route element={<RequireAuth />}>
          <Route element={<RequireUserDetails />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="soldart" element={<SoldArtifacts />} />
            <Route path="boughtart" element={<BoughtArtifacts />} />
            <Route path="messages" element={<Messages />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
