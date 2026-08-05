import { SearchX } from "lucide-react";
import LoadingState from "../common/LoadingState";
import EmptyState from "../common/EmptyState";
import DeviceListItem from "./DeviceListItem";

export default function DeviceList({ devices, isLoading, onSelectDevice }) {
  if (isLoading) {
    return <LoadingState count={4} />;
  }

  if (!devices || devices.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No devices found"
        description="Try searching for a different term or adjusting filters"
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {devices.map((device) => (
        <DeviceListItem
          key={device.id}
          device={device}
          onClick={onSelectDevice}
        />
      ))}
    </div>
  );
}
