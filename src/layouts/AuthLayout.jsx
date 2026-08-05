import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="w-full max-w-md p-4">{/* 24rem ≈ 384px */}
        <Outlet />
      </div>
    </div>
  );
}
