import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Hash,
  ShieldAlert,
  Calendar,
  Check,
  Clock,
  CalendarClock,
} from "lucide-react";

import Button from "../components/ui/Button";
import StatusBadge from "../components/common/StatusBadge";
import DeviceImage from "../components/device/DeviceImage";
import Card, { CardContent } from "../components/ui/Card";
import { useDispatch, useSelector } from "react-redux";
import { getDeviceById } from "../store/device/deviceThunk";
import {
  bookDevice,
  fetchCheckouts,
  reserveDeviceThunk,
} from "../store/checkout/checkoutThunk";
import {
  fetchWaitingList,
  joinWaitingThunk,
} from "../store/waitlist/waitlistThunk";
import CheckoutDialog from "../components/checkout/CheckoutDialog";
import ReserveDialog from "../components/checkout/ReserveDialog";
import { toast } from "sonner";

export default function DeviceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isReserving, setIsReserving] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  useEffect(() => {
    dispatch(getDeviceById(id));
    dispatch(fetchCheckouts());
    dispatch(fetchWaitingList());
  }, [dispatch, id]);

  const { device } = useSelector((state) => state.device);
  const { checkouts } = useSelector((state) => state.checkout);
  const { waitinglist } = useSelector((state) => state.reservation);

  if (!device) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <ShieldAlert className="w-12 h-12 text-danger mb-4" />
        <h2 className="text-lg font-bold text-foreground">Device Not Found</h2>
        <p className="text-xs text-muted-foreground mt-1 mb-6">
          The device may have been removed or ID is invalid.
        </p>
        <Button variant="outline" size="sm" onClick={() => navigate("/search")}>
          Back to Search
        </Button>
      </div>
    );
  }


  const { status } = device;

  // Check if current user already has this device checked out or is on its waitlist
  const isAlreadyCheckedOut = checkouts.some(
    (c) => c.deviceId === device.id && c.type === "CHECKOUT",
  );
  const isAlreadyReserved = checkouts.some(
    (c) => c.deviceId === device.id && c.type === "RESERVATION",
  );
  const isAlreadyWaitlisted = waitinglist.some((w) => w.deviceId === device.id);

  const handleCheckout = async (durationMinutes) => {
    try {
      const expectedReturnTime = new Date(
        Date.now() + durationMinutes * 60 * 1000,
      ).toISOString();

      await dispatch(
        bookDevice({ deviceId: device.id, expectedReturnTime }),
      ).unwrap();
      toast.success("Checkout Successful");
      navigate("/checkouts");
    } catch (err) {
      toast.error(err?.message || String(err) || "Checkout failed");
      console.error("Checkout failed:", err);
    }
  };

  const handleReserveConfirm = async (startTime, durationMinutes) => {
    try {
      const isoStartTime = new Date(startTime).toISOString();
      const expectedReturnTime = new Date(
        new Date(startTime).getTime() + durationMinutes * 60 * 1000,
      ).toISOString();

      await dispatch(
        reserveDeviceThunk({
          deviceId: device.id,
          startTime: isoStartTime,
          expectedReturnTime,
        }),
      ).unwrap();

      toast.success("Device reserved successfully");
      setIsReserving(false);
      navigate("/checkouts");
    } catch (err) {
      toast.error(err?.message || String(err) || "Reservation failed");
      console.error("Reservation failed:", err);
    }
  };

  const handleJoinWaitlist = async (e) => {
    e.preventDefault();
    try {
      await dispatch(joinWaitingThunk({ deviceId: device.id })).unwrap();
      toast.success("Added to waiting List");
      navigate("/waitlist");
    } catch (error) {
      toast.error(error?.message || String(error) || "Checkout failed");
      console.error("Checkout failed:", error);
    }
  };

  const getStatusMessage = () => {
    if (status === "MAINTENANCE") {
      return "This device is currently undergoing routine maintenance and is unavailable.";
    }
    if (status === "RETIRED") {
      return "This device has been retired from active service.";
    }
    if (isAlreadyCheckedOut) {
      return "You currently have this device checked out.";
    }
    if (isAlreadyReserved) {
      return "You have reserved this device.";
    }
    return null;
  };

  const date = new Date(device?.expectedReturnDate);

  const returnTime = date.toLocaleString("en-US");

  return (
    <div className="space-y-5 select-none">
      {/* Header and Back Button */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl border border-border bg-card/60 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all cursor-pointer shadow-xs active:scale-95"
          aria-label="Go back"
        >
          <ChevronLeft className="w-4.5 h-4.5" />
        </button>
        <span className="text-xs text-muted-foreground font-medium">
          Device Specifications
        </span>
      </div>

      {/* Main card */}
      <Card className="overflow-hidden border border-border/80 bg-card shadow-xs">
        {/* Device visual */}
        <DeviceImage category={device.category} className="h-52 w-full" />

        <CardContent className="p-5 space-y-5">
          {/* Title & Badge */}
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                {device.name}
              </h1>
              <StatusBadge status={device.status} className="mt-0.5" />
            </div>
            <p className="text-xs text-muted-foreground capitalize font-medium">
              {device.category?.toLowerCase()}
            </p>
          </div>

          {/* Quick info row */}
          <div className="grid grid-cols-2 gap-3.5 py-2 border-y border-border/80 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Hash className="w-4 h-4 text-primary shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                  Serial Number
                </span>
                <span className="text-foreground font-semibold truncate">
                  {device.serialNumber || device.serial_no || "N/A"}
                </span>
              </div>
            </div>
            {device.status === "IN_USE" && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarClock className="w-4 h-4 text-amber-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                    Expected Return
                  </span>
                  <span className="text-foreground font-semibold truncate">
                    {returnTime}
                  </span>
                </div>
              </div>
            )}
          </div>


          {/* Specs List */}
          {/* {specs && specs.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" /> Technical Specs
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-5 list-disc text-xs text-muted-foreground">
                {specs.map((spec, i) => (
                  <li key={i} className="leading-relaxed">
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          )} */}

          {/* Contextual actions */}
          <div className="space-y-3 pt-2">
            {/* Status alerts */}
            {getStatusMessage() && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-muted/60 border border-border/80 text-xs text-foreground font-medium">
                <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{getStatusMessage()}</p>
              </div>
            )}

            {/* Buttons */}
            {status === "AVAILABLE" && !isReserving && (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsReserving(true)}
                >
                  <Calendar className="w-4 h-4" /> Reserve
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setIsCheckout(true)}
                >
                  Check Out
                </Button>
              </div>
            )}

            {(status === "IN_USE" || status === "RESERVATION") && (
              <div>
                {isAlreadyWaitlisted ? (
                  <Button
                    className="w-full border-border bg-muted text-muted-foreground border cursor-not-allowed"
                    disabled
                  >
                    <Check className="w-4 h-4 text-emerald-500" /> Already On Waitlist
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={handleJoinWaitlist}
                  >
                    <Clock className="w-4 h-4" /> Join Waitlist
                  </Button>
                )}
              </div>
            )}

            {(status === "MAINTENANCE" || status === "RETIRED") && (
              <Button
                className="w-full bg-muted border border-border text-muted-foreground cursor-not-allowed"
                disabled
              >
                Unavailable
              </Button>
            )}
          </div>


          <CheckoutDialog
            isOpen={isCheckout}
            device={device}
            onClose={() => setIsCheckout(false)}
            onConfirm={handleCheckout}
          />

          <ReserveDialog
            isOpen={isReserving}
            device={device}
            onClose={() => setIsReserving(false)}
            onConfirm={handleReserveConfirm}
          />
        </CardContent>
      </Card>
    </div>
  );
}
