import { useState, useEffect } from "react";
import Button from "../ui/Button";

const EXTENSION_OPTIONS = [
  { label: "30 Minutes", value: 30 },
  { label: "1 Hour", value: 60 },
  { label: "2 Hours", value: 120 },
  { label: "4 Hours", value: 240 },
];

const getDefaultStartDateTime = () => {
  const date = new Date(Date.now() + 60 * 60 * 1000); // Default to 1 hour from now
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
};

export default function ReserveDialog({ isOpen, onClose, onConfirm, device }) {
  const [startTime, setStartTime] = useState(getDefaultStartDateTime());
  const [selectedDuration, setSelectedDuration] = useState(120);

  useEffect(() => {
    if (isOpen) {
      setStartTime(getDefaultStartDateTime());
      setSelectedDuration(120);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getNewDueTime = () => {
    try {
      if (!startTime) return "";
      const baseDate = new Date(startTime);
      const newDate = new Date(baseDate.getTime() + selectedDuration * 60 * 1000);
      return newDate.toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch (e) {
      return "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startTime) return;
    onConfirm(startTime, selectedDuration);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-sm bg-card border border-border rounded-xl p-5 shadow-2xl space-y-4 animate-scaleUp">
        <div className="space-y-1.5">
          <h3 className="text-base font-semibold text-white font-sans">
            Reserve Device
          </h3>
          <p className="text-xs text-muted-foreground">
            Schedule a reservation for <strong className="text-white font-medium">{device?.name}</strong>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="reserveStartTime"
              className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block"
            >
              Start Time
            </label>
            <input
              type="datetime-local"
              id="reserveStartTime"
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.04] border border-border rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
              Reservation Duration
            </span>
            <div className="grid grid-cols-2 gap-2">
              {EXTENSION_OPTIONS.map((opt) => (
                <button
                  type="button"
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
          </div>

          <div className="p-3 bg-white/[0.02] border border-border/60 rounded-lg text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Projected due time: </span>
              <span className="text-white font-semibold">{getNewDueTime()}</span>
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="text-xs bg-primary hover:bg-primary/95 text-white"
            >
              Confirm Reservation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
