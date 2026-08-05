import { useState } from "react";
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
} from "lucide-react";
import Button from "../components/ui/Button";
import StatusBadge from "../components/common/StatusBadge";
import DeviceImage from "../components/device/DeviceImage";
import Card, { CardContent } from "../components/ui/Card";
import { useApp } from "../context/AppContext";

export default function DeviceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    devices,
    checkouts,
    waitlist,
    checkoutDevice,
    reserveDevice,
    joinWaitlist,
  } = useApp();

  const [isReserving, setIsReserving] = useState(false);
  const [reserveTime, setReserveTime] = useState("");

  const device = devices.find((d) => d.id === id);

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

  const { name, category, status, serialNumber, location, specs } = device;

  // Check if current user already has this device checked out or is on its waitlist
  const isAlreadyCheckedOut = checkouts.some(
    (c) => c.deviceId === device.id && c.type === "CHECKOUT",
  );
  const isAlreadyReserved = checkouts.some(
    (c) => c.deviceId === device.id && c.type === "RESERVATION",
  );
  const isAlreadyWaitlisted = waitlist.some((w) => w.deviceId === device.id);

  const handleCheckout = () => {
    checkoutDevice(device.id);
    navigate("/checkouts");
  };

  const handleReserveSubmit = (e) => {
    e.preventDefault();
    if (!reserveTime) return;

    // Convert input time to ISO string
    const isoTime = new Date(reserveTime).toISOString();
    reserveDevice(device.id, isoTime);
    setIsReserving(false);
    navigate("/checkouts");
  };

  const handleJoinWaitlist = () => {
    joinWaitlist(device.id);
    navigate("/waitlist");
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
        <DeviceImage category={category} className="h-52 w-full" />

        <CardContent className="p-5 space-y-5">
          {/* Title & Badge */}
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-xl font-bold text-white tracking-tight">
                {name}
              </h1>
              <StatusBadge status={status} className="mt-0.5" />
            </div>
            <p className="text-xs text-muted-foreground capitalize leading-normal">
              {category?.toLowerCase()}
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
                  {serialNumber || "N/A"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary/70 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground/60 uppercase font-semibold">
                  Location
                </span>
                <span className="text-white font-medium truncate">
                  {location || "Office"}
                </span>
              </div>
            </div>
          </div>

          {/* Specs List */}
          {specs && specs.length > 0 && (
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
          )}

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
                  onClick={handleCheckout}
                >
                  Check Out
                </Button>
              </div>
            )}

            {/* Reserve Form */}
            {isReserving && (
              <form
                onSubmit={handleReserveSubmit}
                className="space-y-3 p-3.5 bg-white/[0.02] border border-border/80 rounded-xl"
              >
                <div className="space-y-1.5">
                  <label
                    htmlFor="reserveTime"
                    className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block"
                  >
                    Choose Reservation Time
                  </label>
                  <input
                    type="datetime-local"
                    id="reserveTime"
                    required
                    value={reserveTime}
                    onChange={(e) => setReserveTime(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full h-9 rounded-lg border border-border bg-black/40 px-3 py-1 text-xs text-white focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => setIsReserving(false)}
                    className="text-xs cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    type="submit"
                    className="text-xs bg-primary text-white cursor-pointer"
                  >
                    Confirm Reservation
                  </Button>
                </div>
              </form>
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
        </CardContent>
      </Card>
    </div>
  );
}
