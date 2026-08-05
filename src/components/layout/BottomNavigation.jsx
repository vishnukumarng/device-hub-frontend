import { NavLink } from "react-router-dom";
import { QrCode, Search, ListChecks, Clock } from "lucide-react";
import { cn } from "../../lib/utils";

const TABS = [
  { to: "/scan", icon: QrCode, label: "Scan" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/checkouts", icon: ListChecks, label: "Checkouts" },
  { to: "/waitlist", icon: Clock, label: "Waitlist" },
];

export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 border-t border-border bg-card/90 backdrop-blur-md z-40 select-none md:shadow-lg">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto h-full">
        <ul className="flex h-full items-center justify-around">
          {TABS.map(({ to, icon: Icon, label }) => (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center h-full py-1 text-[10px] md:text-xs font-semibold gap-1 transition-colors cursor-pointer",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-white"
                  )
                }
              >
                <div className={cn("p-1 rounded-md transition-all duration-200")}>
                  <Icon className="h-5 w-5" />
                </div>
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
