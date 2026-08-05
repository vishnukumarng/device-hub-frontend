import { cn } from "../../lib/utils";

export default function PageHeader({ title, description, actions, className }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 pb-4 border-b border-border/60 mb-5 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold tracking-tight text-white">{title}</h1>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
