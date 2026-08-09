import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import CheckoutList from "../components/checkout/CheckoutList";
import ReturnDialog from "../components/checkout/ReturnDialog";
import ExtendDialog from "../components/checkout/ExtendDialog";
import { useApp } from "../context/AppContext";

export default function Checkout() {
  const { checkouts, returnDevice, extendCheckout, cancelReservation } =
    useApp();

  const [selectedCheckout, setSelectedCheckout] = useState(null);
  const [isReturnOpen, setIsReturnOpen] = useState(false);
  const [isExtendOpen, setIsExtendOpen] = useState(false);

  const handleReturnClick = (checkout) => {
    setSelectedCheckout(checkout);
    setIsReturnOpen(true);
  };

  const handleExtendClick = (checkout) => {
    setSelectedCheckout(checkout);
    setIsExtendOpen(true);
  };

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
        onConfirm={returnDevice}
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
