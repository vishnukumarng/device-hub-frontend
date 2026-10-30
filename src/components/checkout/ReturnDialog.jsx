import Button from "../ui/Button";

export default function ReturnDialog({ isOpen, onClose, onConfirm, checkout }) {
  if (!isOpen || !checkout) return null;

  const { device } = checkout;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 dark:bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-sm bg-card border border-border/80 rounded-2xl p-5 md:p-6 shadow-xl space-y-4 animate-scaleUp">
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-foreground">Return Device</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Are you sure you want to return <strong className="text-foreground font-semibold">{device?.name}</strong>? 
            Please make sure you place it in its designated location.
          </p>
        </div>

        <div className="flex justify-end gap-2.5 pt-3">
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
            className="text-xs"
          >
            Confirm Return
          </Button>
        </div>
      </div>
    </div>
  );
}

