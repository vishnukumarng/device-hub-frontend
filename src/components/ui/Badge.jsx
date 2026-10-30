import * as React from "react";
import { cn } from "../../lib/utils";

export function Badge({ className, variant = "default", ...props }) {
  const baseStyles =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variants = {
    default:
      "border-transparent bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
    secondary:
      "border-border bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive:
      "border-transparent bg-danger text-white shadow-xs hover:bg-danger/80",
    outline: "text-foreground border-border bg-card/60 shadow-2xs",
    success:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border",
    warning:
      "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 border",
  };


  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}

export default Badge;
