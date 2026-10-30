import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import Login from "../pages/Login";
import Scan from "../pages/Scan";
import Search from "../pages/Search";
import Checkout from "../pages/Checkout";
import Waitlist from "../pages/Waitlist";
import DeviceDetails from "../pages/DeviceDetails";
import Profile from "../pages/Profile";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminDevices from "../pages/admin/AdminDevices";
import AdminCheckouts from "../pages/admin/AdminCheckouts";
import AdminWaitlist from "../pages/admin/AdminWaitlist";
import AdminUsers from "../pages/admin/AdminUsers";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public (login) */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>

      {/* Protected Employee App */}
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

      {/* Protected Admin Console */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="devices" element={<AdminDevices />} />
          <Route path="checkouts" element={<AdminCheckouts />} />
          <Route path="waitlist" element={<AdminWaitlist />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Route>

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

