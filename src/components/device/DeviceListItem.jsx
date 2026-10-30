import { Laptop, Smartphone, Tablet, ChevronRight } from "lucide-react";
import StatusBadge from "../common/StatusBadge";
import ItemCard from "../common/ItemCard";

const CATEGORY_STYLES = {
  LAPTOP: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  SMARTPHONE: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  PHONE: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  TABLET: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

export default function DeviceListItem({ device, onClick }) {
  const { name, category, status } = device;
  const upperCat = category?.toUpperCase();
  const Icon = CATEGORY_ICONS[upperCat] ?? Laptop;
  const iconStyle = CATEGORY_STYLES[upperCat] ?? "bg-primary/10 text-primary border-primary/20";

  return (
    <ItemCard
      icon={Icon}
      iconBgColor={iconStyle}
      title={name}
      subtitle={category ? `${category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()} • ${device.serial_no || device.serialNumber || "No S/N"}` : undefined}
      badge={<StatusBadge status={status} />}
      actions={<ChevronRight className="w-4.5 h-4.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />}
      onClick={onClick ? () => onClick(device) : undefined}
    />
  );
}

