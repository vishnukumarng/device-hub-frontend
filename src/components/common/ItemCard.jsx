import { cn } from "../../lib/utils";
import Card from "../ui/Card";

export default function ItemCard({
  icon: Icon,
  iconBgColor = "bg-white/5",
  iconColor = "text-muted-foreground",
  title,
  subtitle,
  badge,
  actions,
  onClick,
  className,
  children,
}) {
  const CardWrapper = onClick ? "button" : "div";

  return (
    <Card
      className={cn(
        "w-full text-left overflow-hidden border border-border bg-card p-3.5 transition-all duration-200",
        onClick && "cursor-pointer hover:bg-white/[0.02] hover:border-white/10 active:scale-[0.99]",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3.5">
        {Icon && (
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-border/40",
              iconBgColor
            )}
          >
            <Icon className={cn("w-5 h-5", iconColor)} />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-white truncate">{title}</h4>
            {badge && <div className="shrink-0">{badge}</div>}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
            {actions}
          </div>
        )}
      </div>
      {children && <div className="mt-3.5">{children}</div>}
    </Card>
  );
}
