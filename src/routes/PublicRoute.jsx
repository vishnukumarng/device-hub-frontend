import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function PublicRoute() {
  const { currentUser } = useApp();
  return currentUser ? <Navigate to="/scan" replace /> : <Outlet />;
}
