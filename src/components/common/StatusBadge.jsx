import Badge from "../ui/Badge";
import { cn } from "../../lib/utils";


const STATUS_CONFIG = {
  AVAILABLE: {
    label: "Available",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
    dotColor: "bg-emerald-500 animate-pulse",
  },
  IN_USE: { 
    label: "In Use", 
    className: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/25",
    dotColor: "bg-indigo-500",
  },
  MAINTENANCE: { 
    label: "Maintenance", 
    className: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25",
    dotColor: "bg-rose-500",
  },
  RETIRED: { 
    label: "Retired", 
    className: "bg-muted text-muted-foreground border-border",
    dotColor: "bg-muted-foreground",
  },
  ACTIVE: { 
    label: "Active", 
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
    dotColor: "bg-emerald-500 animate-pulse",
  },
  RESERVATION: { 
    label: "Reserved", 
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25",
    dotColor: "bg-amber-500",
  },
  COMPLETED: { 
    label: "Completed", 
    className: "bg-muted text-muted-foreground border-border",
    dotColor: "bg-muted-foreground",
  },
  CANCELLED: { 
    label: "Cancelled", 
    className: "bg-muted text-muted-foreground border-border",
    dotColor: "bg-muted-foreground",
  },
  AUTO_RELEASED: {
    label: "Auto-Released",
    className: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/25",
    dotColor: "bg-orange-500",
  },
  PENDING: { 
    label: "Pending", 
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25",
    dotColor: "bg-amber-500",
  },
  NOTIFIED: { 
    label: "Notified", 
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25 animate-pulse",
    dotColor: "bg-emerald-500",
  },
};

export default function StatusBadge({ status, className }) {
  const normalizedStatus = status ? status.toUpperCase() : "AVAILABLE";
  const config = STATUS_CONFIG[normalizedStatus] ?? {
    label: status,
    className: "bg-muted text-muted-foreground border-border",
    dotColor: "bg-muted-foreground",
  };

  return (
    <Badge
      className={cn(
        config.className,
        "inline-flex items-center gap-1.5 font-semibold capitalize py-0.5 px-2.5 text-[11px] tracking-wide transition-colors",
        className
      )}
      variant="outline"
    >
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", config.dotColor)} />
      {config.label}
    </Badge>
  );
}

