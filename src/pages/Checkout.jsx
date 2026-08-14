import { useEffect, useState } from "react";
import PageHeader from "../components/common/PageHeader";
import CheckoutList from "../components/checkout/CheckoutList";
import ReturnDialog from "../components/checkout/ReturnDialog";
import ExtendDialog from "../components/checkout/ExtendDialog";
import CheckoutDialog from "../components/checkout/CheckoutDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCheckouts,
  returnDevice,
  cancelReservationThunk,
  claimReservationThunk
} from "../store/checkout/checkoutThunk";
import { toast } from "sonner";

export default function Checkout() {
  const [selectedCheckout, setSelectedCheckout] = useState(null);
  const [isReturnOpen, setIsReturnOpen] = useState(false);
  const [isExtendOpen, setIsExtendOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const dispatch = useDispatch();

  const { checkouts, loading } = useSelector((state) => state.checkout);

  const handleConfirmReturn = async () => {
    if (!selectedCheckout) return;
    try {
      await dispatch(returnDevice(selectedCheckout.id)).unwrap();
      toast.success("Device returned successfully");
      setIsReturnOpen(false);
      setSelectedCheckout(null);
    } catch (err) {
      toast.error(err?.message || String(err) || "Return failed");
      console.error("Return failed:", err);
    }
  };

  const handleCancelReservation = async (checkout) => {
    try {
      await dispatch(cancelReservationThunk(checkout.id)).unwrap();
      toast.success(`Reservation for ${checkout.device?.name || "device"} cancelled`);
    } catch (err) {
      toast.error(err?.message || String(err) || "Cancellation failed");
      console.error("Cancellation failed:", err);
    }
  };

  const handleCheckoutClick = (checkout) => {
    setSelectedCheckout(checkout);
    setIsCheckoutOpen(true);
  };

  const handleConfirmCheckout = async (durationMinutes) => {
    if (!selectedCheckout) return;
    try {
      const expectedReturnTime = new Date(
        Date.now() + durationMinutes * 60 * 1000,
      ).toISOString();

      await dispatch(
        claimReservationThunk({
          checkoutId: selectedCheckout.id,
          expectedReturnTime,
        })
      ).unwrap();

      toast.success("Device checked out successfully");
      setIsCheckoutOpen(false);
      setSelectedCheckout(null);
    } catch (err) {
      toast.error(err?.message || String(err) || "Checkout failed");
      console.error("Checkout failed:", err);
    }
  };

  const handleReturnClick = (checkout) => {
    setSelectedCheckout(checkout);
    setIsReturnOpen(true);
  };

  const handleExtendClick = (checkout) => {
    setSelectedCheckout(checkout);
    setIsExtendOpen(true);
  };

  const handleExtendConfirm = (checkout, durationMinutes) => {
    toast.success(`Extend request (mock) sent for ${checkout.device?.name} for ${durationMinutes} minutes`);
    setIsExtendOpen(false);
    setSelectedCheckout(null);
  };

  useEffect(() => {
    dispatch(fetchCheckouts());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <PageHeader
        title="My Checkouts"
        description="Monitor your active device checkouts, renew leases, or review upcoming reservations."
      />

      <CheckoutList
        checkouts={checkouts}
        isLoading={loading}
        onReturn={handleReturnClick}
        onExtend={handleExtendClick}
        onCancel={handleCancelReservation}
        onCheckout={handleCheckoutClick}
      />

      {/* Return confirmation dialog */}
      <ReturnDialog
        isOpen={isReturnOpen}
        onClose={() => {
          setIsReturnOpen(false);
          setSelectedCheckout(null);
        }}
        onConfirm={handleConfirmReturn}
        checkout={selectedCheckout}
      />

      {/* Extend renewal dialog */}
      <ExtendDialog
        isOpen={isExtendOpen}
        onClose={() => {
          setIsExtendOpen(false);
          setSelectedCheckout(null);
        }}
        onConfirm={handleExtendConfirm}
        checkout={selectedCheckout}
      />

      {/* Claim/Checkout Reservation dialog */}
      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setSelectedCheckout(null);
        }}
        onConfirm={handleConfirmCheckout}
        device={selectedCheckout?.device}
      />
    </div>
  );
}

