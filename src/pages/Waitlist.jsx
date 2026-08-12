import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../components/common/PageHeader";
import WaitlistList from "../components/waitlist/WaitlistList";
import { useApp } from "../context/AppContext";
import { useEffect } from "react";
import { fetchWaitingList } from "../store/waitlist/waitlistThunk";

export default function Waitlist() {
  const { leaveWaitlist, claimWaitlistDevice } = useApp();

  const { waitinglist } = useSelector((state) => state.reservation);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWaitingList());
  }, []);

  return (
    <div className="space-y-4">
      <PageHeader
        title="My Waitlist"
        description="View devices you are waiting for. When a device becomes free, you will have a limited time to check it out."
      />

      <WaitlistList
        entries={waitinglist}
        isLoading={false}
        onCancel={leaveWaitlist}
        onCheckout={claimWaitlistDevice}
      />
    </div>
  );
}
