import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  Search,
  Shield,
  ShieldCheck,
  User,
  Laptop,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { fetchAdminUsers, updateUserRole } from "../../api/admin.api";
import { toast } from "sonner";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminUsers();
      setUsers(data || []);
    } catch (err) {
      console.error("Failed to load users:", err);
      toast.error("Failed to fetch user list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const handleToggleRole = async (userId, currentRole, userName) => {
    const nextRole = currentRole === "admin" ? "employee" : "admin";
    if (
      !window.confirm(
        `Are you sure you want to change ${userName}'s role from ${currentRole} to ${nextRole}?`
      )
    ) {
      return;
    }

    setUpdatingId(userId);
    try {
      await updateUserRole(userId, nextRole);
      toast.success(`${userName} is now an ${nextRole}`);
      loadUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground">
            Team Members & Access Control
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage organization members, view active equipment loans per user, and configure admin privileges.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={loadUsers}
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
            placeholder="Search by team member name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10 rounded-xl bg-card/60 border-border/80"
          />
        </div>
      </Card>

      {/* Users Data Table */}
      <Card className="border border-border/80 bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-muted-foreground font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Member</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Active Hardware Held</th>
                <th className="py-3 px-4">Total Loans</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4 text-right">Role Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    <Users className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                    No team members found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isAdmin = user.role === "admin";
                  const activeItems = user.activeCheckouts || [];

                  return (
                    <tr key={user.id} className="hover:bg-muted/40 transition-colors">
                      {/* Name & Avatar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                            {user.name?.[0] || "U"}
                          </div>
                          <div>
                            <span className="font-bold text-foreground text-sm block">
                              {user.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-3.5 px-4 font-semibold">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold border ${
                            isAdmin
                              ? "bg-primary/10 text-primary border-primary/25"
                              : "bg-muted text-muted-foreground border-border"
                          }`}
                        >
                          <ShieldCheck className="w-3 h-3" />
                          {user.role}
                        </span>
                      </td>

                      {/* Active Devices */}
                      <td className="py-3.5 px-4">
                        {activeItems.length > 0 ? (
                          <div className="space-y-1">
                            {activeItems.map((c) => (
                              <div
                                key={c.id}
                                className="flex items-center gap-1.5 text-xs font-semibold text-foreground"
                              >
                                <Laptop className="w-3.5 h-3.5 text-primary" />
                                <span>{c.device?.name}</span>
                                <span className="text-[10px] font-mono text-muted-foreground">
                                  ({c.device?.serial_no})
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[11px] text-muted-foreground/60 italic">
                            No devices held
                          </span>
                        )}
                      </td>

                      {/* Total Loans */}
                      <td className="py-3.5 px-4 font-bold text-foreground">
                        {user.totalCheckouts} loan{user.totalCheckouts !== 1 ? "s" : ""}
                      </td>

                      {/* Joined Date */}
                      <td className="py-3.5 px-4 text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString([], {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleRole(user.id, user.role, user.name)}
                          disabled={updatingId === user.id}
                          className="text-xs"
                        >
                          {isAdmin ? "Demote to Employee" : "Promote to Admin"}
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
