import * as React from "react";
import { cn } from "../../lib/utils";

export const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block select-none",
      className
    )}
    {...props}
  />
));
Label.displayName = "Label";

export default Label;
