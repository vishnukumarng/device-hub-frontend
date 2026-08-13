import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScanLine, Keyboard, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import QrScanner from "qr-scanner";
import PageHeader from "../components/common/PageHeader";
import Card, { CardContent } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Label from "../components/ui/Label";
import { useApp } from "../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { getdeviceThunk } from "../store/device/deviceThunk";

export default function Scan() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { devices } = useApp();
  const [manualId, setManualId] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const videoRef = useRef(null);
  const scannerRef = useRef(null);

  const handleQrResult = async (qr_code) => {
    scannerRef.current?.stop();
    setIsProcessing(true);
    toast.loading("Looking up device...", { id: "qr-lookup" });

    try {
      const device = await dispatch(getdeviceThunk(qr_code)).unwrap();

      toast.dismiss("qr-lookup");
      toast.success(`Found device: ${device.name}`);
      navigate(`/devices/${device.id}`);
    } catch (errorMessage) {
      toast.dismiss("qr-lookup");
      toast.error(errorMessage || "Device not found for this QR code");

      setIsProcessing(false);
      scannerRef.current?.start();
    }
  };

  useEffect(() => {
    if (!videoRef.current) return;

    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => {
        if (isProcessing) return; // ignore repeated fires mid-lookup
        console.log("QR Code detected:", result.data);
        handleQrResult(result.data);
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
        preferredCamera: "environment",
      },
    );

    scannerRef.current = qrScanner;

    qrScanner
      .start()
      .then(() => setIsScanning(true))
      .catch((err) => {
        console.error("Camera error:", err);
        toast.error("Camera access denied or unavailable");
      });

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
      scannerRef.current = null;
    };
  }, []);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualId.trim()) return;

    const device = devices.find(
      (d) =>
        d.id.toLowerCase() === manualId.trim().toLowerCase() ||
        d.serial_no?.toLowerCase() === manualId.trim().toLowerCase(),
    );

    if (device) {
      toast.success(`Found device: ${device.name}`);
      navigate(`/devices/${device.id}`);
    } else {
      toast.error("Device ID or Serial Number not found");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Scan Device"
        description="Point your device camera at a Device QR Code, or type its ID below."
      />

      {/* Real camera scanner */}
      <Card className="overflow-hidden border-border/80 bg-card relative">
        <div className="aspect-[4/3] w-full bg-black relative">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            playsInline
          />

          <div className="absolute bottom-4 left-0 right-0 text-center z-10">
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
              {isScanning ? "Scanning..." : "Starting camera..."}
            </span>
          </div>
        </div>
      </Card>

      {/* Manual Input Form (unchanged) */}
      {/* <Card className="border-border bg-card">
        <CardContent className="p-4">
          <form onSubmit={handleManualSubmit} className="space-y-3">
            <div className="flex flex-col">
              <Label htmlFor="manualId" className="flex items-center gap-1.5">
                <Keyboard className="w-3.5 h-3.5 text-muted-foreground" />{" "}
                Manual ID / Serial Entry
              </Label>
              <div className="flex gap-2">
                <Input
                  id="manualId"
                  placeholder="e.g. dev-1, IP15P-8921..."
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value)}
                  disabled={isScanning}
                />
                <Button
                  type="submit"
                  disabled={isScanning}
                  className="shrink-0 bg-primary text-white"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card> */}
    </div>
  );
}
