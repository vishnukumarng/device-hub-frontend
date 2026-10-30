import React, { useState, useEffect, useMemo } from "react";
import {
  Laptop,
  Smartphone,
  Tablet,
  Headphones,
  Search,
  PlusCircle,
  QrCode,
  Edit2,
  Trash2,
  Filter,
  RefreshCw,
  ExternalLink,
  Hash,
  AlertCircle,
} from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import StatusBadge from "../../components/common/StatusBadge";
import DeviceQrModal from "../../components/admin/DeviceQrModal";
import DeviceFormModal from "../../components/admin/DeviceFormModal";
import {
  fetchAdminDevices,
  createDevice,
  updateDevice,
  deleteDevice,
} from "../../api/admin.api";
import { toast } from "sonner";

const CATEGORIES = ["ALL", "LAPTOP", "SMARTPHONE", "TABLET", "ACCESSORY"];
const STATUSES = ["ALL", "AVAILABLE", "IN_USE", "MAINTENANCE", "RETIRED"];

const CATEGORY_ICONS = {
  LAPTOP: Laptop,
  SMARTPHONE: Smartphone,
  PHONE: Smartphone,
  TABLET: Tablet,
  ACCESSORY: Headphones,
};

export default function AdminDevices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Modals state
  const [qrModalDevice, setQrModalDevice] = useState(null);
  const [editModalDevice, setEditModalDevice] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadDevices = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminDevices();
      setDevices(data || []);
    } catch (err) {
      console.error("Failed to load devices:", err);
      toast.error("Failed to fetch device inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDevices();
    const handleDeviceCreated = () => loadDevices();
    window.addEventListener("device-created", handleDeviceCreated);
    return () => window.removeEventListener("device-created", handleDeviceCreated);
  }, []);

  const filteredDevices = useMemo(() => {
    return devices.filter((d) => {
      const matchSearch =
        d.name?.toLowerCase().includes(search.toLowerCase()) ||
        d.serial_no?.toLowerCase().includes(search.toLowerCase());

      const matchCat =
        selectedCat === "ALL" || d.category?.toUpperCase() === selectedCat;

      const matchStatus =
        selectedStatus === "ALL" || d.status?.toUpperCase() === selectedStatus;

      return matchSearch && matchCat && matchStatus;
    });
  }, [devices, search, selectedCat, selectedStatus]);

  const handleAddSubmit = async (formData) => {
    try {
      await createDevice(formData);
      toast.success(`Device "${formData.name}" added to inventory`);
      loadDevices();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to create device");
      throw err;
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await updateDevice(editModalDevice.id, formData);
      toast.success(`Device "${formData.name}" updated successfully`);
      loadDevices();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to update device");
      throw err;
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}? This cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteDevice(id);
      toast.success(`Device "${name}" deleted`);
      loadDevices();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to delete device");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground">
            Hardware Fleet Inventory
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Register, configure, print QR asset tags, and monitor all organization devices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadDevices}
            disabled={loading}
            className="text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button size="sm" onClick={() => setIsAddOpen(true)} className="text-xs">
            <PlusCircle className="w-4 h-4" /> Add Device
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <Card className="border border-border/80 bg-card p-4 space-y-3.5 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search by device name or serial number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10 rounded-xl bg-card/60 border-border/80"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all shrink-0 cursor-pointer ${
                  selectedCat === cat
                    ? "bg-primary border-primary text-primary-foreground shadow-xs shadow-primary/25"
                    : "border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {cat === "ALL" ? "All Categories" : cat.charAt(0) + cat.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* Status Selection */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Status:
            </span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-8.5 px-3 text-xs font-semibold bg-card/60 border border-border/80 rounded-xl text-foreground focus:outline-none focus:border-primary shadow-xs cursor-pointer"
            >
              {STATUSES.map((st) => (
                <option key={st} value={st} className="bg-card text-foreground">
                  {st === "ALL" ? "All Statuses" : st.charAt(0) + st.slice(1).toLowerCase().replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Devices Data Table */}
      <Card className="border border-border/80 bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-muted-foreground font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Device</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Serial Number</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Current Possession</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredDevices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    <AlertCircle className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                    No devices match your active filters.
                  </td>
                </tr>
              ) : (
                filteredDevices.map((device) => {
                  const upperCat = device.category?.toUpperCase();
                  const Icon = CATEGORY_ICONS[upperCat] ?? Laptop;
                  const isCheckedOut = device.activeCheckout;

                  return (
                    <tr
                      key={device.id}
                      className="hover:bg-muted/40 transition-colors group"
                    >
                      {/* Name & Icon */}
                      <td className="py-3.5 px-4 font-semibold text-foreground">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <span className="font-bold text-foreground text-sm block">
                              {device.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              ID: {device.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 font-medium capitalize text-muted-foreground">
                        {device.category?.toLowerCase()}
                      </td>

                      {/* Serial Number */}
                      <td className="py-3.5 px-4 font-mono font-bold text-foreground">
                        {device.serial_no}
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4">
                        <StatusBadge status={device.status} />
                      </td>

                      {/* Possession */}
                      <td className="py-3.5 px-4">
                        {isCheckedOut ? (
                          <div>
                            <p className="font-semibold text-foreground">
                              {isCheckedOut.user?.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              Due:{" "}
                              {new Date(isCheckedOut.expectedReturnTime).toLocaleDateString([], {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            {isCheckedOut.isOverdue && (
                              <span className="inline-block mt-0.5 text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-sm bg-rose-500/15 text-rose-500 border border-rose-500/30">
                                Overdue
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-[11px] text-muted-foreground/60 italic">
                            On Storage Shelf
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setQrModalDevice(device)}
                            className="p-2 rounded-lg border border-border/80 bg-card/60 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all cursor-pointer shadow-2xs"
                            title="Print QR Asset Tag"
                          >
                            <QrCode className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditModalDevice(device)}
                            className="p-2 rounded-lg border border-border/80 bg-card/60 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all cursor-pointer shadow-2xs"
                            title="Edit Device"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(device.id, device.name)}
                            disabled={deletingId === device.id}
                            className="p-2 rounded-lg border border-border/80 bg-card/60 text-danger hover:bg-danger/10 transition-all cursor-pointer shadow-2xs"
                            title="Delete Device"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* QR Code Printable Asset Tag Modal */}
      <DeviceQrModal
        isOpen={!!qrModalDevice}
        onClose={() => setQrModalDevice(null)}
        device={qrModalDevice}
      />

      {/* Add Device Modal */}
      <DeviceFormModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddSubmit}
        isEditing={false}
      />

      {/* Edit Device Modal */}
      <DeviceFormModal
        isOpen={!!editModalDevice}
        onClose={() => setEditModalDevice(null)}
        onSubmit={handleEditSubmit}
        device={editModalDevice}
        isEditing={true}
      />
    </div>
  );
}
