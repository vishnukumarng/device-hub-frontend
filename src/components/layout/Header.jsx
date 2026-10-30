import { Link, useNavigate } from "react-router-dom";
import { User, Shield } from "lucide-react";
import { ThemeToggle } from "../../context/ThemeContext";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur-md select-none transition-colors">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center p-1 shadow-xs transition-transform group-hover:scale-105">
            <img src="/logo-icon.png" alt="DeviceHub" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              DeviceHub
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/admin"
            className="h-9 px-2.5 rounded-xl border border-border bg-card/60 backdrop-blur-md flex items-center gap-1.5 text-xs font-bold text-primary hover:bg-primary/10 hover:border-primary/30 transition-all shadow-xs cursor-pointer"
            title="Admin Console"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
          <ThemeToggle />
          <button
            onClick={() => navigate("/profile")}
            className="w-9 h-9 rounded-xl border border-border bg-card/60 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
            title="Profile"
            aria-label="View profile"
          >
            <User className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </header>
  );
}


