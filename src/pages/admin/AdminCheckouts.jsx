import React, { useState, useEffect, useMemo } from "react";
import {
  ListChecks,
  AlertTriangle,
  RotateCcw,
  Search,
  CheckCircle2,
  CalendarClock,
  Laptop,
  Filter,
  RefreshCw,
} from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import StatusBadge from "../../components/common/StatusBadge";
import { fetchAdminCheckouts, forceReturnCheckout } from "../../api/admin.api";
import { toast } from "sonner";

const TABS = [
  { id: "ALL", label: "All Records" },
  { id: "ACTIVE", label: "Active Loans" },
  { id: "OVERDUE", label: "Overdue Only" },
  { id: "RESERVATION", label: "Reservations" },
  { id: "RETURNED", label: "Returned History" },
];

export default function AdminCheckouts() {
  const [checkouts, setCheckouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("ACTIVE");
  const [returningId, setReturningId] = useState(null);

  const loadCheckouts = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminCheckouts();
      setCheckouts(data || []);
    } catch (err) {
      console.error("Failed to load checkouts:", err);
      toast.error("Failed to fetch checkout records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCheckouts();
  }, []);

  const filteredCheckouts = useMemo(() => {
    return checkouts.filter((c) => {
      const matchSearch =
        c.device?.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.device?.serial_no?.toLowerCase().includes(search.toLowerCase()) ||
        c.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.user?.email?.toLowerCase().includes(search.toLowerCase());

      if (!matchSearch) return false;

      if (activeTab === "ALL") return true;
      if (activeTab === "ACTIVE") return c.status === "ACTIVE" && c.type === "CHECKOUT";
      if (activeTab === "OVERDUE") return c.isOverdue;
      if (activeTab === "RESERVATION") return c.type === "RESERVATION";
      if (activeTab === "RETURNED") return c.status === "RETURNED";
      return true;
    });
  }, [checkouts, search, activeTab]);

  const handleForceReturn = async (id, deviceName) => {
    if (!window.confirm(`Force return ${deviceName}? This will mark the loan returned immediately and release the device.`)) {
      return;
    }

    setReturningId(id);
    try {
      await forceReturnCheckout(id);
      toast.success(`Device "${deviceName}" returned successfully`);
      loadCheckouts();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to return device");
    } finally {
      setReturningId(null);
    }
  };

  const overdueCount = checkouts.filter((c) => c.isOverdue).length;

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground">
            Equipment Loans & Checkouts Oversight
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monitor active device custody across the company, identify overdue returns, and force release devices.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={loadCheckouts}
          disabled={loading}
          className="text-xs self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Tabs & Search */}
      <Card className="border border-border/80 bg-card p-4 space-y-3.5 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search by device name, serial number, employee name, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10 rounded-xl bg-card/60 border-border/80"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-primary border-primary text-primary-foreground shadow-xs shadow-primary/25"
                  : "border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
              {tab.id === "OVERDUE" && overdueCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                  {overdueCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Table */}
      <Card className="border border-border/80 bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-muted-foreground font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Hardware Asset</th>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Start Time</th>
                <th className="py-3 px-4">Due Return Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredCheckouts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    <ListChecks className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                    No checkout records found in this view.
                  </td>
                </tr>
              ) : (
                filteredCheckouts.map((checkout) => (
                  <tr
                    key={checkout.id}
                    className={`hover:bg-muted/40 transition-colors ${
                      checkout.isOverdue ? "bg-rose-500/5 dark:bg-rose-500/10" : ""
                    }`}
                  >
                    {/* Device */}
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-foreground text-sm block">
                          {checkout.device?.name || "Device"}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {checkout.device?.serial_no} • {checkout.device?.category}
                        </span>
                      </div>
                    </td>

                    {/* Employee */}
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-semibold text-foreground block">
                          {checkout.user?.name || "Unknown"}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {checkout.user?.email}
                        </span>
                      </div>
                    </td>

                    {/* Loan Type */}
                    <td className="py-3.5 px-4 font-semibold">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border ${
                          checkout.type === "CHECKOUT"
                            ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {checkout.type}
                      </span>
                    </td>

                    {/* Start Time */}
                    <td className="py-3.5 px-4 text-muted-foreground">
                      {new Date(checkout.startTime).toLocaleString([], {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    {/* Expected Return */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">
                          {new Date(checkout.expectedReturnTime).toLocaleString([], {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {checkout.isOverdue && (
                          <span className="text-[9px] font-extrabold uppercase text-rose-500 flex items-center gap-0.5 mt-0.5">
                            <AlertTriangle className="w-3 h-3" /> Overdue
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={checkout.status} />
                    </td>

                    {/* Admin Force Return */}
                    <td className="py-3.5 px-4 text-right">
                      {checkout.status === "ACTIVE" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleForceReturn(checkout.id, checkout.device?.name)}
                          disabled={returningId === checkout.id}
                          className="text-xs border-primary/30 hover:bg-primary/10 text-primary"
                        >
                          <RotateCcw className="w-3 h-3" />
                          {returningId === checkout.id ? "Returning..." : "Mark Returned"}
                        </Button>
                      ) : (
                        <span className="text-[11px] text-muted-foreground/60 italic">
                          Closed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
