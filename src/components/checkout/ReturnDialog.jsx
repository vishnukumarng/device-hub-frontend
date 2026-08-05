import Button from "../ui/Button";

export default function ReturnDialog({ isOpen, onClose, onConfirm, checkout }) {
  if (!isOpen || !checkout) return null;

  const { device } = checkout;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-sm bg-card border border-border rounded-xl p-5 shadow-2xl space-y-4 animate-scaleUp">
        <div className="space-y-1.5">
          <h3 className="text-base font-semibold text-white">Return Device</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Are you sure you want to return <strong className="text-white font-medium">{device?.name}</strong>? 
            Please make sure you return it to its designated location.
          </p>
        </div>

        <div className="flex justify-end gap-2.5 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClose}
            className="text-xs"
          >
            Cancel
          </Button>
          <Button 
            size="sm" 
            onClick={() => {
              onConfirm(checkout);
              onClose();
            }}
            className="text-xs bg-primary hover:bg-primary/95 text-white"
          >
            Confirm Return
          </Button>
        </div>
      </div>
    </div>
  );
}
