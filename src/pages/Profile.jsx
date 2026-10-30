import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  LogOut,
  CheckCircle2,
  History,
  ListChecks,
  CalendarClock,
  Clock,
  ShieldCheck,
} from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import Card, { CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { useApp } from "../context/AppContext";
import { logout } from "../store/auth/authSlice";

const MOCK_HISTORY = [
  {
    id: "hist-1",
    deviceName: 'iPad Pro 11"',
    category: "TABLET",
    returnedAt: "Yesterday, 4:15 PM",
  },
  {
    id: "hist-2",
    deviceName: "iPhone 13 mini",
    category: "SMARTPHONE",
    returnedAt: "July 28, 2026, 11:30 AM",
  },
  {
    id: "hist-3",
    deviceName: "Lenovo ThinkPad P1",
    category: "LAPTOP",
    returnedAt: "July 15, 2026, 5:02 PM",
  },
];

import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { theme, setTheme } = useTheme();
  const { checkouts = [], waitlist = [] } = useApp() || {};

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!user) return null;


  const activeCount = checkouts.filter((c) => c.type === "CHECKOUT").length;
  const reserveCount = checkouts.filter((c) => c.type === "RESERVATION").length;
  const waitlistCount = waitlist.length;

  return (
    <div className="space-y-6 select-none">
      <PageHeader
        title="Employee Profile"
        description="Manage your account, view your active rentals, and check your checkout history."
      />

      {/* Account Info Card */}
      <Card className="border border-border/80 bg-card shadow-xs">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-indigo-500 flex items-center justify-center text-xl font-bold text-white shadow-xs shadow-primary/25 shrink-0">
            {user?.name
              ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "U"}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-foreground truncate">
              {user?.name}
            </h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5 truncate font-medium">
              <Mail className="w-3.5 h-3.5 text-muted-foreground/70 shrink-0" />
              {user.email}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-danger hover:bg-danger/10 hover:text-danger rounded-xl shrink-0 cursor-pointer"
            title="Sign Out"
            aria-label="Sign out"
          >
            <LogOut className="w-4.5 h-4.5" />
          </Button>
        </CardContent>
      </Card>

      {/* Admin Panel Access */}

      <Card className="border border-primary/25 bg-primary/5 shadow-xs p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">Admin Management Console</h4>
            <p className="text-xs text-muted-foreground">Manage device inventory, active loans, and team access</p>
          </div>
        </div>
        <Button size="sm" onClick={() => navigate("/admin")} className="text-xs shrink-0">
          Open Console &rarr;
        </Button>
      </Card>

      {/* Appearance Setting */}
      <Card className="border border-border/80 bg-card shadow-xs p-4">

        <div className="flex items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-foreground">Theme Preference</h4>
            <p className="text-xs text-muted-foreground">Toggle between Clean Light and Refined Dark mode</p>
          </div>
          <div className="flex items-center p-1 bg-muted rounded-xl border border-border/60">
            <button
              onClick={() => setTheme("light")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                theme === "light"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              Dark
            </button>
          </div>
        </div>
      </Card>

      {/* Usage Summary Grid */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border border-border/80 bg-card shadow-xs text-center p-4 flex flex-col items-center justify-center">
          <ListChecks className="w-4.5 h-4.5 text-primary mb-1.5" />
          <span className="text-xl font-bold text-foreground leading-tight">
            {activeCount}
          </span>
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">
            Active
          </span>
        </Card>
        <Card className="border border-border/80 bg-card shadow-xs text-center p-4 flex flex-col items-center justify-center">
          <CalendarClock className="w-4.5 h-4.5 text-amber-500 mb-1.5" />
          <span className="text-xl font-bold text-foreground leading-tight">
            {reserveCount}
          </span>
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">
            Reserved
          </span>
        </Card>
        <Card className="border border-border/80 bg-card shadow-xs text-center p-4 flex flex-col items-center justify-center">
          <Clock className="w-4.5 h-4.5 text-emerald-500 mb-1.5" />
          <span className="text-xl font-bold text-foreground leading-tight">
            {waitlistCount}
          </span>
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">
            Waitlisted
          </span>
        </Card>
      </div>

      {/* Returned History list */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 px-0.5">
          <History className="w-3.5 h-3.5 text-primary" /> Return History
        </h3>

        <div className="flex flex-col gap-2">
          {MOCK_HISTORY.map((hist) => (
            <Card key={hist.id} className="border border-border/80 bg-card shadow-xs p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">
                    {hist.deviceName}
                  </h4>
                  <p className="text-xs text-muted-foreground capitalize mt-0.5 leading-normal">
                    {hist.category?.toLowerCase()}
                  </p>
                </div>
                <div className="text-right shrink-0 flex flex-col items-end">
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    Returned
                  </span>
                  <span className="text-[10px] text-muted-foreground/70 mt-0.5">
                    {hist.returnedAt}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

