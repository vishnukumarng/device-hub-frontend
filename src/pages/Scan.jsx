import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScanLine, Keyboard, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "../components/common/PageHeader";
import Card, { CardContent } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Label from "../components/ui/Label";
import { useApp } from "../context/AppContext";

export default function Scan() {
  const navigate = useNavigate();
  const { devices } = useApp();
  const [manualId, setManualId] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualId.trim()) return;

    const device = devices.find(
      (d) => d.id.toLowerCase() === manualId.trim().toLowerCase() || d.serialNumber.toLowerCase() === manualId.trim().toLowerCase()
    );

    if (device) {
      toast.success(`Found device: ${device.name}`);
      navigate(`/devices/${device.id}`);
    } else {
      toast.error("Device ID or Serial Number not found");
    }
  };

  const simulateScan = (deviceId) => {
    setIsScanning(true);
    toast.loading("Positioning camera and decoding QR code...", { id: "scan-loading" });
    
    setTimeout(() => {
      setIsScanning(false);
      toast.dismiss("scan-loading");
      navigate(`/devices/${deviceId}`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Scan Device"
        description="Point your device camera at a Device QR Code, or type its ID below."
      />

      {/* Simulated Scanner viewport */}
      <Card className="overflow-hidden border-border/80 bg-card relative">
        <div className="aspect-[4/3] w-full bg-black relative flex flex-col items-center justify-center p-6 text-center select-none">
          {/* Grid lines overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:20px_20px] opacity-30" />
          
          {/* Camera lens highlight */}
          <div className="absolute w-56 h-56 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center">
            {/* Target Corners */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-md" />
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-md" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-md" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-md" />
            
            <ScanLine className="w-10 h-10 text-primary/40 animate-pulse" />
          </div>

          {/* Animated scan bar */}
          <div className="absolute left-0 right-0 h-0.5 bg-primary/60 shadow-[0_0_12px_#3B82F6] animate-scanMove z-10" />

          {/* Overlay info */}
          <div className="absolute bottom-4 text-center z-10">
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
              {isScanning ? "Decoding Code..." : "Ready to Scan"}
            </span>
          </div>
        </div>
      </Card>

      {/* Demo QR Simulation Links */}
      <div className="space-y-2">
        <Label>Simulate Scan (Demo Links)</Label>
        <div className="grid grid-cols-2 gap-2">
          {devices.slice(0, 4).map((dev) => (
            <button
              key={dev.id}
              onClick={() => simulateScan(dev.id)}
              disabled={isScanning}
              className="flex items-center justify-between p-2.5 text-xs text-left rounded-lg border border-border bg-white/[0.02] hover:bg-white/5 text-muted-foreground hover:text-white transition-all cursor-pointer"
            >
              <span className="truncate">{dev.name}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-1 text-primary" />
            </button>
          ))}
        </div>
      </div>

      {/* Manual Input Form */}
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <form onSubmit={handleManualSubmit} className="space-y-3">
            <div className="flex flex-col">
              <Label htmlFor="manualId" className="flex items-center gap-1.5">
                <Keyboard className="w-3.5 h-3.5 text-muted-foreground" /> Manual ID / Serial Entry
              </Label>
              <div className="flex gap-2">
                <Input
                  id="manualId"
                  placeholder="e.g. dev-1, IP15P-8921..."
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value)}
                  disabled={isScanning}
                />
                <Button type="submit" disabled={isScanning} className="shrink-0 bg-primary text-white">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
