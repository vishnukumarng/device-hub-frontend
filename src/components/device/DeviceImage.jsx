import { Laptop, Smartphone, Tablet } from "lucide-react";
import { cn } from "../../lib/utils";


const IMAGE_THEMES = {
  LAPTOP: {
    gradient: "from-indigo-50 via-blue-50/60 to-indigo-100/50 dark:from-indigo-950/80 dark:via-slate-900 dark:to-indigo-900/60",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    icon: Laptop,
  },
  SMARTPHONE: {
    gradient: "from-teal-50 via-emerald-50/60 to-teal-100/50 dark:from-teal-950/80 dark:via-slate-900 dark:to-emerald-950/60",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    icon: Smartphone,
  },
  PHONE: {
    gradient: "from-teal-50 via-emerald-50/60 to-teal-100/50 dark:from-teal-950/80 dark:via-slate-900 dark:to-emerald-950/60",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    icon: Smartphone,
  },
  TABLET: {
    gradient: "from-amber-50 via-orange-50/60 to-amber-100/50 dark:from-rose-950/80 dark:via-slate-900 dark:to-amber-950/60",
    iconColor: "text-amber-600 dark:text-amber-400",
    icon: Tablet,
  },
};

export default function DeviceImage({ category, className }) {
  const theme = IMAGE_THEMES[category?.toUpperCase()] ?? IMAGE_THEMES.LAPTOP;
  const Icon = theme.icon;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center bg-gradient-to-tr overflow-hidden border-b border-border/80 select-none",
        theme.gradient,
        className
      )}
    >
      {/* Decorative ambient glowing lights */}
      <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-primary/15 blur-2xl pointer-events-none" />
      <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-indigo-500/15 blur-2xl pointer-events-none" />
      
      {/* Centered Glassmorphic Icon Container */}
      <div className="relative z-10 w-16 h-16 rounded-2xl bg-card/80 border border-border/80 flex items-center justify-center shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-md">
        <Icon className={cn("w-8 h-8", theme.iconColor)} />
      </div>


      {/* Decorative ambient glowing lights */}
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-primary/20 blur-2xl" />
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
    </div>
  );
}
