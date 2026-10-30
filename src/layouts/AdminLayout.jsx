import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Laptop,
  ListChecks,
  Clock,
  Users,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  PlusCircle,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/auth/authSlice";
import { ThemeToggle } from "../context/ThemeContext";
import Button from "../components/ui/Button";
import DeviceFormModal from "../components/admin/DeviceFormModal";
import { createDevice } from "../api/admin.api";
import { toast } from "sonner";

const NAV_ITEMS = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/devices", label: "Device Fleet", icon: Laptop },
  { to: "/admin/checkouts", label: "Checkouts & Loans", icon: ListChecks },
  { to: "/admin/waitlist", label: "Waitlists & Queue", icon: Clock },
  { to: "/admin/users", label: "Team & Roles", icon: Users },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleCreateDevice = async (formData) => {
    try {
      await createDevice(formData);
      toast.success(`Device "${formData.name}" created successfully`);
      // Trigger a page refresh or custom event if on devices page
      window.dispatchEvent(new CustomEvent("device-created"));
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to create device");
      throw err;
    }
  };

  const currentNav = NAV_ITEMS.find((item) =>
    item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)
  ) || NAV_ITEMS[0];

  return (
    <div className="flex h-screen bg-background text-foreground transition-colors overflow-hidden">
      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-card/95 md:bg-card border-r border-border/80 flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-border/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center p-1 shadow-xs">
              <img src="/logo-icon.png" alt="DeviceHub" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-sm text-foreground">DeviceHub</span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                  Admin
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium">Hardware Management</p>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Add Button */}
        <div className="px-3 pt-4 pb-2">
          <button
            onClick={() => setAddModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 h-9 px-3 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs shadow-primary/25 active:scale-98 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> Add New Device
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 text-xs font-semibold rounded-xl transition-all duration-150 group cursor-pointer ${
                    isActive
                      ? "bg-primary/12 text-primary shadow-2xs font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                <span className="flex-1 truncate">{item.label}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-3 border-t border-border/80 space-y-2">
          {/* Link to Employee Portal */}
          <NavLink
            to="/scan"
            className="flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl border border-border/80 bg-card/60 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all group"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-primary" /> Employee Portal
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">/scan</span>
          </NavLink>

          {/* User profile & actions */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                {user?.name?.[0] || "A"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-foreground truncate">{user?.name || "Admin User"}</p>
                <p className="text-[10px] text-muted-foreground truncate">{user?.email || "admin@company.com"}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-danger hover:bg-danger/10 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 px-4 md:px-8 border-b border-border/80 bg-card/50 backdrop-blur-md flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-foreground">
                {currentNav.label}
              </h1>
              <p className="text-[11px] text-muted-foreground hidden sm:block">
                Admin Console • DeviceHub Enterprise
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              API Connected
            </div>
            <Button
              size="sm"
              onClick={() => setAddModalOpen(true)}
              className="text-xs hidden sm:inline-flex"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Add Device
            </Button>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Quick Add Modal */}
      <DeviceFormModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleCreateDevice}
      />
    </div>
  );
}
