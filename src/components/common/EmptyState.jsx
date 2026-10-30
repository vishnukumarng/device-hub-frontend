import { Button } from "../ui/Button";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 select-none animate-fadeIn">
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-card border border-border/80 shadow-xs flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-muted-foreground" />
        </div>
      )}
      <h3 className="text-base font-bold text-foreground">{title}</h3>

      {description && (
        <p className="text-xs text-muted-foreground mt-1.5 max-w-[240px] leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button size="sm" className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
