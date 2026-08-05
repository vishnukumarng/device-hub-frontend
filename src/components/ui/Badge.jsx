import * as React from "react";
import { cn } from "../../lib/utils";

export function Badge({ className, variant = "default", ...props }) {
  const baseStyles =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variants = {
    default:
      "border-transparent bg-primary text-white shadow hover:bg-primary/80",
    secondary:
      "border-transparent bg-border text-white hover:bg-border/80",
    destructive:
      "border-transparent bg-danger text-white shadow hover:bg-danger/80",
    outline: "text-white border-border bg-transparent",
    success:
      "border-transparent bg-success/20 text-success border border-success/30",
    warning:
      "border-transparent bg-warning/20 text-warning border border-warning/30",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}

export default Badge;
