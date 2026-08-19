import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Cpu,
  MapPin,
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
        <h2 className="text-base font-bold text-white">Device Not Found</h2>
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
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full border border-border bg-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
          aria-label="Go back"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs text-muted-foreground">
          Device Specifications
        </span>
      </div>

      {/* Main card */}
      <Card className="overflow-hidden border-border/80 bg-card">
        {/* Device visual */}
        <DeviceImage category={device.category} className="h-52 w-full" />

        <CardContent className="p-5 space-y-5">
          {/* Title & Badge */}
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-xl font-bold text-white tracking-tight">
                {device.name}
              </h1>
              <StatusBadge status={device.status} className="mt-0.5" />
            </div>
            <p className="text-xs text-muted-foreground capitalize leading-normal">
              {device.category?.toLowerCase()}
            </p>
          </div>

          {/* Quick info row */}
          <div className="grid grid-cols-2 gap-3.5 py-1 border-y border-border/40 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Hash className="w-4 h-4 text-primary/70 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground/60 uppercase font-semibold">
                  Serial Number
                </span>
                <span className="text-white font-medium truncate">
                  {device.serialNumber || "N/A"}
                </span>
              </div>
            </div>
            {device.status === "IN_USE" && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarClock className="w-3.5 h-3.5 text-warning" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground/60 uppercase font-semibold">
                    Expected Return
                  </span>
                  <span className="text-white font-medium truncate">
                    {returnTime}
                  </span>
                </div>
              </div>
            )}
            {/* <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary/70 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground/60 uppercase font-semibold">
                  Location
                </span>
                <span className="text-white font-medium truncate">
                  {location || "Office"}
                </span>
              </div>
            </div> */}
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
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-border/60 text-xs text-muted-foreground">
                <ShieldAlert className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                <p className="leading-relaxed">{getStatusMessage()}</p>
              </div>
            )}

            {/* Buttons */}
            {status === "AVAILABLE" && !isReserving && (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 cursor-pointer"
                  onClick={() => setIsReserving(true)}
                >
                  <Calendar className="w-4 h-4" /> Reserve
                </Button>
                <Button
                  className="flex-1 bg-primary text-white cursor-pointer"
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
                    className="w-full border-border/60 bg-white/5 text-muted-foreground hover:bg-white/5 hover:text-muted-foreground border cursor-not-allowed"
                    disabled
                  >
                    <Check className="w-4 h-4 text-success" /> Already On
                    Waitlist
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-primary text-white cursor-pointer"
                    onClick={handleJoinWaitlist}
                  >
                    <Clock className="w-4 h-4" /> Join Waitlist
                  </Button>
                )}
              </div>
            )}

            {(status === "MAINTENANCE" || status === "RETIRED") && (
              <Button
                className="w-full bg-white/5 border border-border text-muted-foreground cursor-not-allowed"
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
