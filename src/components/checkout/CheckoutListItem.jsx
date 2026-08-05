import { Laptop, Smartphone, Tablet, CalendarClock, X, ArrowUpRight } from "lucide-react";
import Button from "../ui/Button";
import ItemCard from "../common/ItemCard";

const CATEGORY_ICONS = {
  LAPTOP: Laptop,
  SMARTPHONE: Smartphone,
  PHONE: Smartphone,
  TABLET: Tablet,
};

export default function CheckoutListItem({
  checkout,
  onReturn,
  onExtend,
  onCancel,
}) {
  const { device, type, startTime, expectedReturnTime } = checkout;
  const isReservation = type === "RESERVATION";
  const Icon = CATEGORY_ICONS[device?.category?.toUpperCase()] ?? Laptop;

  // Format date helper
  const formatTime = (timeStr) => {
    try {
      return new Date(timeStr).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return timeStr;
    }
  };

  const getSubtitle = () => {
    if (isReservation) {
      return `Reserved for ${formatTime(startTime)}`;
    }
    return `Checked out on ${formatTime(startTime)} · Due ${formatTime(expectedReturnTime)}`;
  };

  return (
    <ItemCard
      icon={isReservation ? CalendarClock : Icon}
      iconBgColor={isReservation ? "bg-warning/10" : "bg-primary/10"}
      iconColor={isReservation ? "text-warning" : "text-primary"}
      title={device?.name || "Device"}
      subtitle={getSubtitle()}
      actions={
        isReservation ? (
          <button
            onClick={() => onCancel?.(checkout)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/5 active:bg-white/10 text-muted-foreground hover:text-white transition-colors cursor-pointer"
            title="Cancel Reservation"
            aria-label="Cancel reservation"
          >
            <X className="w-4 h-4" />
          </button>
        ) : null
      }
    >
      {!isReservation && (
        <div className="flex gap-2.5 mt-3 pt-2.5 border-t border-border/40">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => onExtend?.(checkout)}
          >
            Extend
          </Button>
          <Button
            size="sm"
            className="flex-1 text-xs"
            onClick={() => onReturn?.(checkout)}
          >
            Return
          </Button>
        </div>
      )}
    </ItemCard>
  );
}
