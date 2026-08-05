import { Link, useNavigate } from "react-router-dom";
import { User, Laptop } from "lucide-react";
import Button from "../ui/Button";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md select-none">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
            <Laptop className="w-4.5 h-4.5 text-primary" />
          </div>
          <span className="text-sm font-bold tracking-tight text-white group-hover:text-primary transition-colors">
            DeviceHub
          </span>
        </Link>

        <button
          onClick={() => navigate("/profile")}
          className="w-8 h-8 rounded-full border border-border bg-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
          title="Profile"
          aria-label="View profile"
        >
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
