import Badge from "../ui/Badge";
import { cn } from "../../lib/utils";

const STATUS_CONFIG = {
  AVAILABLE: {
    label: "Available",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  IN_USE: { 
    label: "In Use", 
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20" 
  },
  MAINTENANCE: { 
    label: "Maintenance", 
    className: "bg-danger/10 text-danger border-danger/20" 
  },
  RETIRED: { 
    label: "Retired", 
    className: "bg-zinc-800 text-zinc-400 border-zinc-700" 
  },
  ACTIVE: { 
    label: "Active", 
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
  },
  RESERVATION: { 
    label: "Reserved", 
    className: "bg-warning/10 text-warning border-warning/20" 
  },
  COMPLETED: { 
    label: "Completed", 
    className: "bg-zinc-800 text-zinc-400 border-zinc-700" 
  },
  CANCELLED: { 
    label: "Cancelled", 
    className: "bg-zinc-800 text-zinc-400 border-zinc-700" 
  },
  AUTO_RELEASED: {
    label: "Auto-Released",
    className: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  },
  PENDING: { 
    label: "Pending", 
    className: "bg-warning/10 text-warning border-warning/20" 
  },
  NOTIFIED: { 
    label: "Notified", 
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 animate-pulse" 
  },
};

export default function StatusBadge({ status, className }) {
  const normalizedStatus = status ? status.toUpperCase() : "AVAILABLE";
  const config = STATUS_CONFIG[normalizedStatus] ?? {
    label: status,
    className: "bg-zinc-800 text-zinc-400 border-zinc-700",
  };

  return (
    <Badge
      className={cn(config.className, "font-medium capitalize py-0.5 px-2.5", className)}
      variant="outline"
    >
      {config.label}
    </Badge>
  );
}
