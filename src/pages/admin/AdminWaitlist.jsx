import React, { useState, useEffect, useMemo } from "react";
import { Clock, Search, Bell, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import StatusBadge from "../../components/common/StatusBadge";
import { fetchAdminWaitlist } from "../../api/admin.api";
import { toast } from "sonner";

export default function AdminWaitlist() {
  const [waitlist, setWaitlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadWaitlist = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminWaitlist();
      setWaitlist(data || []);
    } catch (err) {
      console.error("Failed to load waitlist:", err);
      toast.error("Failed to fetch waitlist queue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWaitlist();
  }, []);

  const filtered = useMemo(() => {
    return waitlist.filter((w) => {
      return (
        w.device?.name?.toLowerCase().includes(search.toLowerCase()) ||
        w.device?.serial_no?.toLowerCase().includes(search.toLowerCase()) ||
        w.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        w.user?.email?.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [waitlist, search]);

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground">
            Waitlists & Device Queues
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monitor employees waiting for popular devices and review automated notification states.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={loadWaitlist}
          disabled={loading}
          className="text-xs self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Search */}
      <Card className="border border-border/80 bg-card p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search queue by device, employee, or serial number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10 rounded-xl bg-card/60 border-border/80"
          />
        </div>
      </Card>

      {/* Table */}
      <Card className="border border-border/80 bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-muted-foreground font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Requested Device</th>
                <th className="py-3 px-4">Waiting Employee</th>
                <th className="py-3 px-4">Waitlist Status</th>
                <th className="py-3 px-4">Date Requested</th>
                <th className="py-3 px-4">Notification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground">
                    <Clock className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                    No active waitlist requests found.
                  </td>
                </tr>
              ) : (
                filtered.map((item, index) => (
                  <tr key={item.id} className="hover:bg-muted/40 transition-colors">
                    {/* Device */}
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-foreground text-sm block">
                          {item.device?.name || "Device"}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {item.device?.serial_no} • {item.device?.category}
                        </span>
                      </div>
                    </td>

                    {/* Employee */}
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-semibold text-foreground block">
                          {item.user?.name || "Unknown"}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {item.user?.email}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={item.status} />
                    </td>

                    {/* Created Date */}
                    <td className="py-3.5 px-4 text-muted-foreground">
                      {new Date(item.createdAt).toLocaleString([], {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    {/* Notified */}
                    <td className="py-3.5 px-4">
                      {item.notifiedAt ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <Bell className="w-3.5 h-3.5 animate-bounce" />
                          <span>
                            Notified at{" "}
                            {new Date(item.notifiedAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground/60 italic">
                          Queued (awaiting device return)
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
