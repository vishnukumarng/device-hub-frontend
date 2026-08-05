import { cn } from "../../lib/utils";

const CATEGORIES = ["ALL", "LAPTOP", "SMARTPHONE", "TABLET"];
const STATUSES = ["ALL", "AVAILABLE", "IN_USE", "MAINTENANCE"];

export default function DeviceFilter({
  selectedCategory,
  onSelectCategory,
  selectedStatus,
  onSelectStatus,
}) {
  return (
    <div className="flex flex-col gap-3 py-1 select-none">
      {/* Categories */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory?.(category)}
            className={cn(
              "px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all shrink-0 cursor-pointer",
              selectedCategory === category
                ? "bg-primary border-primary text-white shadow-sm"
                : "border-border bg-white/[0.02] text-muted-foreground hover:text-white hover:bg-white/5"
            )}
          >
            {category === "ALL" ? "All Devices" : category.charAt(0) + category.slice(1).toLowerCase() + "s"}
          </button>
        ))}
      </div>

      {/* Statuses */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => onSelectStatus?.(status)}
            className={cn(
              "px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all shrink-0 cursor-pointer",
              selectedStatus === status
                ? "bg-white text-black border-white shadow-sm"
                : "border-border bg-white/[0.02] text-muted-foreground hover:text-white hover:bg-white/5"
            )}
          >
            {status === "ALL" ? "All Statuses" : status.split("_").map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
          </button>
        ))}
      </div>
    </div>
  );
}
