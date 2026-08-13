import { useState } from "react";
import Button from "../ui/Button";

const EXTENSION_OPTIONS = [
  { label: "30 Minutes", value: 30 },
  { label: "1 Hour", value: 60 },
  { label: "2 Hours", value: 120 },
  { label: "4 Hours", value: 240 },
];

export default function CheckoutDialog({ isOpen, onClose, onConfirm, device }) {
  const [selectedDuration, setSelectedDuration] = useState(60);

  if (!isOpen) return null;

  const getNewDueTime = () =>
    new Date(Date.now() + selectedDuration * 60 * 1000).toLocaleString([], {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-sm bg-card border border-border rounded-xl p-5 shadow-2xl space-y-4 animate-scaleUp">
        <div className="space-y-1.5">
          <h3 className="text-base font-semibold text-white font-sans">
            Checkout
          </h3>
          <p className="text-xs text-muted-foreground">
            Choose how long you need{" "}
            <strong className="text-white font-medium">{device?.name}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 py-1">
          {EXTENSION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelectedDuration(opt.value)}
              className={`px-3 py-2 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                selectedDuration === opt.value
                  ? "bg-primary border-primary text-white"
                  : "border-border bg-white/[0.02] text-muted-foreground hover:text-white hover:bg-white/5"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="p-3 bg-white/[0.02] border border-border/60 rounded-lg text-xs">
          <span className="text-muted-foreground">Projected due time: </span>
          <span className="text-white font-semibold">{getNewDueTime()}</span>
        </div>

        <div className="flex justify-end gap-2.5 pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => {
              onConfirm(selectedDuration);
              onClose();
            }}
            className="text-xs bg-primary hover:bg-primary/95 text-white"
          >
            Confirm Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
