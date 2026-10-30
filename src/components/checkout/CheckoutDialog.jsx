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
        className="absolute inset-0 bg-black/40 dark:bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-sm bg-card border border-border/80 rounded-2xl p-5 md:p-6 shadow-xl space-y-4 animate-scaleUp">
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-foreground">
            Checkout Device
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Choose how long you need{" "}
            <strong className="text-foreground font-semibold">{device?.name}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 py-1">
          {EXTENSION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelectedDuration(opt.value)}
              className={`px-3 py-2.5 text-xs font-semibold rounded-xl border text-center transition-all duration-150 cursor-pointer active:scale-95 ${
                selectedDuration === opt.value
                  ? "bg-primary border-primary text-primary-foreground shadow-xs shadow-primary/25"
                  : "border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="p-3.5 bg-muted/60 border border-border/80 rounded-xl text-xs flex items-center justify-between">
          <span className="text-muted-foreground">Projected return: </span>
          <span className="text-foreground font-bold">{getNewDueTime()}</span>
        </div>

        <div className="flex justify-end gap-2.5 pt-2">
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
            className="text-xs"
          >
            Confirm Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

