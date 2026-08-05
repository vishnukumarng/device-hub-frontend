import { Clock } from "lucide-react";
import LoadingState from "../common/LoadingState";
import EmptyState from "../common/EmptyState";
import WaitlistListItem from "./WaitlistListItem";
import { useNavigate } from "react-router-dom";

export default function WaitlistList({
  entries,
  isLoading,
  onCancel,
  onCheckout,
}) {
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingState count={2} />;
  }

  if (!entries || entries.length === 0) {
    return (
      <EmptyState
        icon={Clock}
        title="Your waitlist is empty"
        description="When a device is currently checked out, you can join its waitlist to be notified when it is returned."
        actionLabel="Search Devices"
        onAction={() => navigate("/search")}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {entries.map((entry) => (
        <WaitlistListItem
          key={entry.id}
          entry={entry}
          onCancel={onCancel}
          onCheckout={onCheckout}
        />
      ))}
    </div>
  );
}
