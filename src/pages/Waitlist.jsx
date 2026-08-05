import PageHeader from "../components/common/PageHeader";
import WaitlistList from "../components/waitlist/WaitlistList";
import { useApp } from "../context/AppContext";

export default function Waitlist() {
  const { waitlist, leaveWaitlist, claimWaitlistDevice } = useApp();

  return (
    <div className="space-y-4">
      <PageHeader
        title="My Waitlist"
        description="View devices you are waiting for. When a device becomes free, you will have a limited time to check it out."
      />

      <WaitlistList
        entries={waitlist}
        isLoading={false}
        onCancel={leaveWaitlist}
        onCheckout={claimWaitlistDevice}
      />
    </div>
  );
}
