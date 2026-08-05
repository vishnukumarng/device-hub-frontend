import { Laptop, Smartphone, Tablet, ChevronRight } from "lucide-react";
import StatusBadge from "../common/StatusBadge";
import ItemCard from "../common/ItemCard";

const CATEGORY_ICONS = {
  LAPTOP: Laptop,
  SMARTPHONE: Smartphone,
  PHONE: Smartphone,
  TABLET: Tablet,
};

export default function DeviceListItem({ device, onClick }) {
  const { name, category, status } = device;
  const Icon = CATEGORY_ICONS[category?.toUpperCase()] ?? Laptop;

  return (
    <ItemCard
      icon={Icon}
      iconBgColor="bg-white/5"
      iconColor="text-muted-foreground"
      title={name}
      subtitle={category}
      badge={<StatusBadge status={status} />}
      actions={<ChevronRight className="w-4 h-4 text-muted-foreground" />}
      onClick={onClick ? () => onClick(device) : undefined}
    />
  );
}
