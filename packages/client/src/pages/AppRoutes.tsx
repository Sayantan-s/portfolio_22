import { Route, Routes } from "react-router";
import { Login, Register } from "./auth";
import { Home } from "./home";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
