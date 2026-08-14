import { ListChecks, CalendarClock } from "lucide-react";
import LoadingState from "../common/LoadingState";
import EmptyState from "../common/EmptyState";
import CheckoutListItem from "./CheckoutListItem";

export default function CheckoutList({
  checkouts,
  isLoading,
  onReturn,
  onExtend,
  onCancel,
  onCheckout,
}) {
  if (isLoading) {
    return <LoadingState count={3} />;
  }

  if (!checkouts || checkouts.length === 0) {
    return (
      <EmptyState
        icon={ListChecks}
        title="No active checkouts"
        description="Search for devices to check them out or reserve them"
      />
    );
  }

  console.log("checkouts", checkouts);

  const activeCheckouts = checkouts.filter((c) => c.type === "CHECKOUT");
  const reservations = checkouts.filter((c) => c.type === "RESERVATION");

  return (
    <div className="space-y-6">
      {/* Active Checkouts Section */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 px-0.5">
          <ListChecks className="w-3.5 h-3.5 text-primary" /> Active Checkouts (
          {activeCheckouts.length})
        </h3>
        {activeCheckouts.length === 0 ? (
          <div className="p-4 rounded-xl border border-dashed border-border bg-white/[0.01] text-center text-xs text-muted-foreground py-6 select-none">
            No devices currently checked out
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {activeCheckouts.map((checkout) => (
              <CheckoutListItem
                key={checkout.id}
                checkout={checkout}
                onReturn={onReturn}
                onExtend={onExtend}
              />
            ))}
          </div>
        )}
      </div>

      {/* Reservations Section */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 px-0.5">
          <CalendarClock className="w-3.5 h-3.5 text-warning" /> Reservations (
          {reservations.length})
        </h3>
        {reservations.length === 0 ? (
          <div className="p-4 rounded-xl border border-dashed border-border bg-white/[0.01] text-center text-xs text-muted-foreground py-6 select-none">
            No upcoming reservations
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {reservations.map((checkout) => (
              <CheckoutListItem
                key={checkout.id}
                checkout={checkout}
                onCancel={onCancel}
                onCheckout={onCheckout}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
