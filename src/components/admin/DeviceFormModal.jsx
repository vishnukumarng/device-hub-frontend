import React, { useState, useEffect } from "react";
import { X, Sparkles, Laptop, Smartphone, Tablet, Headphones } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";

const CATEGORIES = ["LAPTOP", "SMARTPHONE", "TABLET", "ACCESSORY", "OTHER"];
const STATUSES = ["AVAILABLE", "IN_USE", "MAINTENANCE", "RETIRED"];

export default function DeviceFormModal({
  isOpen,
  onClose,
  onSubmit,
  device = null,
  isEditing = false,
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("LAPTOP");
  const [serialNo, setSerialNo] = useState("");
  const [status, setStatus] = useState("AVAILABLE");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (device && isEditing) {
      setName(device.name || "");
      setCategory(device.category?.toUpperCase() || "LAPTOP");
      setSerialNo(device.serial_no || "");
      setStatus(device.status || "AVAILABLE");
    } else {
      setName("");
      setCategory("LAPTOP");
      setSerialNo("");
      setStatus("AVAILABLE");
    }
  }, [device, isEditing, isOpen]);

  if (!isOpen) return null;

  const handleGenerateSerial = () => {
    const prefixMap = {
      LAPTOP: "MBP",
      SMARTPHONE: "PHN",
      TABLET: "TAB",
      ACCESSORY: "ACC",
      OTHER: "DEV",
    };
    const prefix = prefixMap[category] || "DEV";
    const random = Math.floor(1000 + Math.random() * 9000);
    setSerialNo(`${prefix}-${random}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !serialNo.trim()) return;

    setLoading(true);
    try {
      await onSubmit({
        name: name.trim(),
        category,
        serial_no: serialNo.trim(),
        status,
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg bg-card border border-border/80 rounded-2xl p-6 shadow-2xl space-y-5 animate-scaleUp">
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {isEditing ? "Edit Device" : "Add New Device"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {isEditing
                ? "Update hardware specifications and availability"
                : "Register a new hardware asset with automatic QR code generation"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="deviceName">Device Name</Label>
            <Input
              id="deviceName"
              placeholder="e.g. MacBook Pro 16 M3 Max, iPad Pro 12.9"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Category Chips */}
          <div className="space-y-1.5">
            <Label>Device Category</Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer active:scale-95 ${
                    category === cat
                      ? "bg-primary border-primary text-primary-foreground shadow-xs shadow-primary/25"
                      : "border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {cat.charAt(0) + cat.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Serial Number with Generator */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="deviceSerial">Serial Number</Label>
              <button
                type="button"
                onClick={handleGenerateSerial}
                className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3" /> Auto-generate
              </button>
            </div>
            <Input
              id="deviceSerial"
              placeholder="e.g. MBP-8921"
              value={serialNo}
              onChange={(e) => setSerialNo(e.target.value)}
              required
            />
          </div>

          {/* Status Selection */}
          <div className="space-y-1.5">
            <Label htmlFor="deviceStatus">Device Status</Label>
            <select
              id="deviceStatus"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full h-10 px-3.5 text-sm bg-card/60 border border-border/80 rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-xs cursor-pointer"
            >
              {STATUSES.map((st) => (
                <option key={st} value={st} className="bg-card text-foreground">
                  {st.charAt(0) + st.slice(1).toLowerCase().replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border/80">
            <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={loading}>
              {loading ? "Saving..." : isEditing ? "Save Changes" : "Create Device"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
