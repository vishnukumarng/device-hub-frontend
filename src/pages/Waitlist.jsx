import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../components/common/PageHeader";
import WaitlistList from "../components/waitlist/WaitlistList";
import { useEffect } from "react";
import { fetchWaitingList, leftWaitingList } from "../store/waitlist/waitlistThunk";
import { bookDevice } from "../store/checkout/checkoutThunk";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Waitlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { waitinglist, loading } = useSelector((state) => state.reservation);

  const handleLeaveWaitlist = async (entry) => {
    try {
      await dispatch(leftWaitingList(entry.id)).unwrap();
      toast.success(`You left the waitlist`);
    } catch (error) {
      toast.error(error?.message || String(error) || "Leave Waitlist failed");
    }
  };

  const handleCheckout = async (entry) => {
    try {
      await dispatch(bookDevice({ deviceId: entry.deviceId })).unwrap();
      toast.success(`Successfully checked out ${entry.device?.name || "device"}`);
      navigate("/checkouts");
    } catch (error) {
      toast.error(error?.message || String(error) || "Checkout failed");
    }
  };

  useEffect(() => {
    dispatch(fetchWaitingList());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <PageHeader
        title="My Waitlist"
        description="View devices you are waiting for. When a device becomes free, you will have a limited time to check it out."
      />

      <WaitlistList
        entries={waitinglist}
        isLoading={loading}
        onCancel={handleLeaveWaitlist}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

