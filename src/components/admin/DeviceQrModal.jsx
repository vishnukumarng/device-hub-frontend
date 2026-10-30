import React, { useRef } from "react";
import { QrCode, Printer, X, Copy, Check, Hash, Laptop } from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { toast } from "sonner";

export default function DeviceQrModal({ isOpen, onClose, device }) {
  const [copied, setCopied] = React.useState(false);
  const printRef = useRef(null);

  if (!isOpen || !device) return null;

  const qrUrl =
    device.qr_image_url ||
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      device.qr_code || device.id
    )}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(device.qr_code || device.id);
    setCopied(true);
    toast.success("QR Token copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-card border border-border/80 rounded-2xl p-6 shadow-2xl space-y-5 animate-scaleUp">
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <QrCode className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Device Asset Tag</h3>
              <p className="text-xs text-muted-foreground">Print or scan this tag for checkout</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Card Area */}
        <div
          ref={printRef}
          className="p-5 bg-white text-slate-900 border-2 border-slate-900 rounded-2xl shadow-sm space-y-4 flex flex-col items-center text-center"
        >
          {/* Header */}
          <div className="flex items-center justify-between w-full border-b border-slate-200 pb-2.5">
            <div className="flex items-center gap-1.5 font-extrabold text-sm tracking-tight text-slate-900">
              <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-white">
                <Laptop className="w-3.5 h-3.5" />
              </div>
              DeviceHub Asset
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {device.category}
            </span>
          </div>

          {/* QR Code image */}
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
            <img
              src={qrUrl}
              alt={`QR Code for ${device.name}`}
              className="w-48 h-48 object-contain"
            />
          </div>

          {/* Device details */}
          <div className="space-y-1 w-full">
            <h4 className="font-extrabold text-base text-slate-900 leading-tight">{device.name}</h4>
            <div className="flex items-center justify-center gap-2 text-xs font-mono font-medium text-slate-600">
              <span>S/N: {device.serial_no}</span>
            </div>
            <div className="text-[9px] font-mono text-slate-400 truncate max-w-xs mx-auto">
              TOKEN: {device.qr_code || device.id}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyCode}
            className="text-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy Token"}
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
              Close
            </Button>
            <Button size="sm" onClick={handlePrint} className="text-xs">
              <Printer className="w-3.5 h-3.5" /> Print Tag
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
