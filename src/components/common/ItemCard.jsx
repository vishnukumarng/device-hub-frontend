import { cn } from "../../lib/utils";
import Card from "../ui/Card";

export default function ItemCard({
  icon: Icon,
  iconBgColor = "bg-muted text-muted-foreground border-border/60",
  iconColor,
  title,
  subtitle,
  badge,
  actions,
  onClick,
  className,
  children,
}) {
  return (
    <Card
      className={cn(
        "w-full text-left overflow-hidden border border-border/80 bg-card p-4 transition-all duration-200 shadow-xs",
        onClick && "cursor-pointer hover:bg-muted/40 hover:border-primary/30 hover:shadow-sm active:scale-[0.995]",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3.5">
        {Icon && (
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors",
              iconBgColor
            )}
          >
            <Icon className={cn("w-5 h-5", iconColor)} />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-foreground truncate">{title}</h4>
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

