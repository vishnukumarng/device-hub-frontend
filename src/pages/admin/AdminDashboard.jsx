import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Laptop,
  ListChecks,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Wrench,
  Archive,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Users,
  RefreshCw,
} from "lucide-react";
import Card, { CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/common/StatusBadge";
import { fetchDashboardStats } from "../../api/admin.api";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const res = await fetchDashboardStats();
      setData(res);
    } catch (err) {
      console.error("Dashboard stats error:", err);
      toast.error("Failed to load dashboard metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    // Listen for device created events from sidebar
    const handleDeviceCreated = () => loadStats();
    window.addEventListener("device-created", handleDeviceCreated);
    return () => window.removeEventListener("device-created", handleDeviceCreated);
  }, []);

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-muted-foreground font-medium">Loading hardware telemetry...</p>
      </div>
    );
  }

  const metrics = data?.metrics || {
    totalDevices: 0,
    availableDevices: 0,
    inUseDevices: 0,
    maintenanceDevices: 0,
    retiredDevices: 0,
    activeCheckouts: 0,
    activeReservations: 0,
    overdueCount: 0,
    waitlistCount: 0,
    totalUsers: 0,
  };

  const categories = data?.categoryBreakdown || [];
  const activities = data?.recentActivity || [];

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* Top Banner & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground">
            Hardware Fleet Overview
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time telemetry, device availability, active loans, and overdue alerts.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={loadStats}
          disabled={loading}
          className="text-xs self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      {/* Overdue Warning Alert */}
      {metrics.overdueCount > 0 && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-600 dark:text-rose-400">
                {metrics.overdueCount} Overdue Device{metrics.overdueCount > 1 ? "s" : ""}
              </h4>
              <p className="text-xs text-muted-foreground">
                Devices past their return due date require follow-up or admin release.
              </p>
            </div>
          </div>
          <Link to="/admin/checkouts">
            <Button size="sm" variant="destructive" className="text-xs shrink-0 w-full sm:w-auto">
              Inspect Overdue Loans <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      )}

      {/* Key Metric KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Fleet */}
        <Card className="border border-border/80 bg-card p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Total Fleet
            </span>
            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Laptop className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-foreground">{metrics.totalDevices}</span>
            <p className="text-[11px] text-muted-foreground mt-1">Across all hardware categories</p>
          </div>
        </Card>

        {/* Available on Shelf */}
        <Card className="border border-border/80 bg-card p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Available Now
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {metrics.availableDevices}
            </span>
            <p className="text-[11px] text-muted-foreground mt-1">
              Ready for immediate scan checkout
            </p>
          </div>
        </Card>

        {/* In Active Use */}
        <Card className="border border-border/80 bg-card p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Checked Out
            </span>
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <ListChecks className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {metrics.inUseDevices}
            </span>
            <p className="text-[11px] text-muted-foreground mt-1">Currently in employees' possession</p>
          </div>
        </Card>

        {/* Waitlist Queue */}
        <Card className="border border-border/80 bg-card p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Waitlist Queue
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
              {metrics.waitlistCount}
            </span>
            <p className="text-[11px] text-muted-foreground mt-1">Requests waiting for return</p>
          </div>
        </Card>
      </div>

      {/* Fleet Distribution & Status Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Categories Breakdown */}
        <Card className="lg:col-span-2 border border-border/80 bg-card p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">Category Distribution</h3>
              <p className="text-xs text-muted-foreground">Inventory split across equipment types</p>
            </div>
            <Link to="/admin/devices" className="text-xs text-primary font-semibold hover:underline">
              Manage Fleet &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {categories.map((cat) => {
              const pct = metrics.totalDevices
                ? Math.round((cat.count / metrics.totalDevices) * 100)
                : 0;
              return (
                <div
                  key={cat.category}
                  className="p-3.5 rounded-xl border border-border/80 bg-card/60 space-y-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground capitalize">
                      {cat.category.toLowerCase()}s
                    </span>
                    <span className="text-xs font-extrabold text-primary">{cat.count}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium block text-right">
                    {pct}% of fleet
                  </span>
                </div>
              );
            })}
          </div>

          {/* Status Sub-Summary */}
          <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-border/80 text-center">
            <div className="p-2.5 rounded-xl bg-muted/40">
              <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                In Maintenance
              </span>
              <span className="text-base font-bold text-foreground mt-0.5 block">
                {metrics.maintenanceDevices}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-muted/40">
              <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                Reservations
              </span>
              <span className="text-base font-bold text-foreground mt-0.5 block">
                {metrics.activeReservations}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-muted/40">
              <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                Registered Users
              </span>
              <span className="text-base font-bold text-foreground mt-0.5 block">
                {metrics.totalUsers}
              </span>
            </div>
          </div>
        </Card>

        {/* Quick Actions Panel */}
        <Card className="border border-border/80 bg-card p-5 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-foreground">Admin Quick Actions</h3>
            <p className="text-xs text-muted-foreground">High-frequency management tasks</p>
          </div>

          <div className="space-y-2.5">
            <Link
              to="/admin/devices"
              className="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-card/60 hover:bg-muted/80 hover:border-primary/30 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Device Inventory</h4>
                  <p className="text-[10px] text-muted-foreground">Print QR tags, edit specs</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>

            <Link
              to="/admin/checkouts"
              className="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-card/60 hover:bg-muted/80 hover:border-primary/30 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <ListChecks className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Loans Oversight</h4>
                  <p className="text-[10px] text-muted-foreground">Force returns & extensions</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>

            <Link
              to="/admin/users"
              className="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-card/60 hover:bg-muted/80 hover:border-primary/30 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Team Permissions</h4>
                  <p className="text-[10px] text-muted-foreground">Promote & manage roles</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </Card>
      </div>

      {/* Recent Activity Log */}
      <Card className="border border-border/80 bg-card p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            <div>
              <h3 className="text-sm font-bold text-foreground">Recent Checkouts & Returns Activity</h3>
              <p className="text-xs text-muted-foreground">Real-time audit log of equipment movements</p>
            </div>
          </div>
          <Link to="/admin/checkouts" className="text-xs text-primary font-semibold hover:underline">
            View All ({activities.length}) &rarr;
          </Link>
        </div>

        {activities.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-6">
            No checkout activities recorded yet.
          </p>
        ) : (
          <div className="divide-y divide-border/60">
            {activities.map((act) => {
              const isCheckout = act.type === "CHECKOUT";
              return (
                <div key={act.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        act.status === "RETURNED"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : isCheckout
                          ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {act.status === "RETURNED" ? (
                        <CheckCircle2 className="w-4.5 h-4.5" />
                      ) : (
                        <ListChecks className="w-4.5 h-4.5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground truncate">
                          {act.device?.name || "Device"}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          ({act.device?.serial_no})
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {act.user?.name} ({act.user?.email})
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <StatusBadge status={act.status} />
                    <span className="text-[10px] text-muted-foreground block mt-1">
                      {new Date(act.createdAt).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
