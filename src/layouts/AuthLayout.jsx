import { Outlet } from "react-router-dom";
import { ThemeToggle } from "../context/ThemeContext";

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background text-foreground transition-colors p-4 overflow-hidden">
      {/* Ambient soft glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}

