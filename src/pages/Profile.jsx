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

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  console.log("user", user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!user) return null;

  const { checkouts, waitlist } = useApp();

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
      <Card className="border-border bg-card">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xl font-bold text-primary shrink-0">
            {user?.name
              ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "U"}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-white truncate">
              {user?.name}
            </h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5 truncate">
              <Mail className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
              {user.email}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-danger hover:bg-danger/10 hover:text-danger rounded-full shrink-0 cursor-pointer"
            title="Sign Out"
            aria-label="Sign out"
          >
            <LogOut className="w-4.5 h-4.5" />
          </Button>
        </CardContent>
      </Card>

      {/* Usage Summary Grid */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-border bg-card text-center p-3 flex flex-col items-center justify-center">
          <ListChecks className="w-4 h-4 text-primary mb-1.5" />
          <span className="text-lg font-bold text-white leading-tight">
            {activeCount}
          </span>
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">
            Active
          </span>
        </Card>
        <Card className="border-border bg-card text-center p-3 flex flex-col items-center justify-center">
          <CalendarClock className="w-4 h-4 text-warning mb-1.5" />
          <span className="text-lg font-bold text-white leading-tight">
            {reserveCount}
          </span>
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">
            Reserved
          </span>
        </Card>
        <Card className="border-border bg-card text-center p-3 flex flex-col items-center justify-center">
          <Clock className="w-4 h-4 text-emerald-400 mb-1.5" />
          <span className="text-lg font-bold text-white leading-tight">
            {waitlistCount}
          </span>
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">
            Waitlisted
          </span>
        </Card>
      </div>

      {/* Returned History list */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 px-0.5">
          <History className="w-3.5 h-3.5 text-primary" /> Return History
        </h3>

        <div className="flex flex-col gap-2">
          {MOCK_HISTORY.map((hist) => (
            <Card key={hist.id} className="border-border bg-card p-3.5">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-white truncate">
                    {hist.deviceName}
                  </h4>
                  <p className="text-[10px] text-muted-foreground capitalize mt-0.5 leading-normal">
                    {hist.category?.toLowerCase()}
                  </p>
                </div>
                <div className="text-right shrink-0 flex flex-col items-end">
                  <span className="text-[10px] text-muted-foreground/80 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-success shrink-0" />
                    Returned
                  </span>
                  <span className="text-[9px] text-muted-foreground/50 mt-0.5">
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
