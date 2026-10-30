import * as React from "react";
import { cn } from "../../lib/utils";

export const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer";

    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs shadow-primary/25 active:scale-[0.98]",
      destructive: "bg-danger text-white hover:bg-danger/90 shadow-xs active:scale-[0.98]",
      outline:
        "border border-border bg-card/60 text-foreground hover:bg-muted hover:text-foreground active:scale-[0.98] shadow-xs",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]",
      ghost: "text-foreground hover:bg-muted hover:text-foreground active:scale-[0.98]",
      link: "text-primary underline-offset-4 hover:underline font-semibold",
    };

    const sizes = {
      default: "h-9.5 px-4 py-2",
      sm: "h-8.5 rounded-lg px-3 text-xs",
      lg: "h-11 rounded-xl px-8 text-base",
      icon: "h-9.5 w-9.5 rounded-xl",
    };


    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export default Button;
