import { useEffect, useState } from "react";
import PageHeader from "../components/common/PageHeader";
import CheckoutList from "../components/checkout/CheckoutList";
import ReturnDialog from "../components/checkout/ReturnDialog";
import ExtendDialog from "../components/checkout/ExtendDialog";
import { useApp } from "../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckouts, returnDevice } from "../store/checkout/checkoutThunk";

export default function Checkout() {
  const { extendCheckout, cancelReservation } = useApp();

  const [selectedCheckout, setSelectedCheckout] = useState(null);
  const [isReturnOpen, setIsReturnOpen] = useState(false);
  const [isExtendOpen, setIsExtendOpen] = useState(false);

  const dispatch = useDispatch();

  const { checkouts, loading, returning } = useSelector(
    (state) => state.checkout,
  );

  const handleConfirmReturn = async () => {
    if (!selectedCheckout) return;
    try {
      await dispatch(returnDevice(selectedCheckout.id)).unwrap();
      setIsReturnOpen(false);
      setSelectedCheckout(null);
    } catch (err) {
      console.error("Return failed:", err);
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
        isLoading={false}
        onReturn={handleReturnClick}
        onExtend={handleExtendClick}
        onCancel={cancelReservation}
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
        onConfirm={extendCheckout}
        checkout={selectedCheckout}
      />
    </div>
  );
}
