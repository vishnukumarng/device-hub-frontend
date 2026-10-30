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
    <nav className="fixed bottom-0 left-0 right-0 h-16 border-t border-border/80 bg-card/85 backdrop-blur-md z-40 select-none shadow-sm transition-colors">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto h-full px-2">
        <ul className="flex h-full items-center justify-around">
          {TABS.map(({ to, icon: Icon, label }) => (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center h-full py-1 text-[11px] font-semibold gap-1 transition-all duration-200 cursor-pointer rounded-xl group",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={cn(
                        "p-1.5 rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-primary/12 text-primary scale-110 shadow-xs shadow-primary/20"
                          : "group-hover:bg-muted text-muted-foreground"
                      )}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span className={cn("tracking-tight transition-all", isActive && "font-bold")}>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

