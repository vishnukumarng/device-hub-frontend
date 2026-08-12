import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import Login from "../pages/Login";
import Scan from "../pages/Scan";
import Search from "../pages/Search";
import Checkout from "../pages/Checkout";
import Waitlist from "../pages/Waitlist";
import DeviceDetails from "../pages/DeviceDetails";
import Profile from "../pages/Profile";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public (login) */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>

      {/* Protected (main app) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/scan" element={<Scan />} />
          <Route path="/search" element={<Search />} />
          <Route path="/checkouts" element={<Checkout />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/devices/:id" element={<DeviceDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
