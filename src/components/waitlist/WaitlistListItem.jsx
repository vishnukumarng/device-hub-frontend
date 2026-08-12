import { Tablet, Bell, X, Laptop, Smartphone } from "lucide-react";
import Button from "../ui/Button";
import ItemCard from "../common/ItemCard";
import { cn } from "../../lib/utils";

const CATEGORY_ICONS = {
  LAPTOP: Laptop,
  SMARTPHONE: Smartphone,
  PHONE: Smartphone,
  TABLET: Tablet,
};

export default function WaitlistListItem({ entry, onCancel, onCheckout }) {
  const { device, status, createdAt, position } = entry;
  const isNotified = status === "NOTIFIED";
  const Icon = CATEGORY_ICONS[device?.category?.toUpperCase()] ?? Tablet;

  const getSubtitle = () => {
    if (isNotified) {
      return "Device is now available! Claim it now.";
    }
    const positionStr = position ? ` · Position #${position}` : "";
    try {
      return `Waiting since ${new Date(createdAt).toLocaleDateString()}${positionStr}`;
    } catch (e) {
      return `Waiting${positionStr}`;
    }
  };

  return (
    <ItemCard
      icon={isNotified ? Bell : Icon}
      iconBgColor={
        isNotified
          ? "bg-success/15 border-success/30"
          : "bg-warning/15 border-warning/30"
      }
      iconColor={isNotified ? "text-success" : "text-warning"}
      title={device?.name || "Device"}
      subtitle={getSubtitle()}
      className={cn(
        isNotified &&
          "border-success/50 bg-success/5 shadow-[0_0_15px_rgba(34,197,94,0.05)]",
      )}
      actions={
        !isNotified ? (
          <button
            onClick={() => onCancel?.(entry)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/5 active:bg-white/10 text-muted-foreground hover:text-white transition-colors cursor-pointer"
            title="Leave Waitlist"
            aria-label="Leave waitlist"
          >
            <X className="w-4 h-4" />
          </button>
        ) : null
      }
    >
      {isNotified && (
        <div className="flex gap-2.5 mt-3 pt-2.5 border-t border-success/20">
          <Button
            size="sm"
            className="w-full text-xs bg-success hover:bg-success/95 text-white border-0 shadow-sm"
            onClick={() => onCheckout?.(entry)}
          >
            Check Out Now
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-success/30 hover:bg-success/10 text-success"
            onClick={() => onCancel?.(entry)}
          >
            Dismiss
          </Button>
        </div>
      )}
    </ItemCard>
  );
}
