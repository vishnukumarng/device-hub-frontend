import { Laptop, Smartphone, Tablet } from "lucide-react";
import { cn } from "../../lib/utils";


const IMAGE_THEMES = {
  LAPTOP: {
    gradient: "from-indigo-950 via-slate-900 to-indigo-900",
    iconColor: "text-indigo-400",
    icon: Laptop,
  },
  SMARTPHONE: {
    gradient: "from-teal-950 via-slate-900 to-emerald-950",
    iconColor: "text-emerald-400",
    icon: Smartphone,
  },
  PHONE: {
    gradient: "from-teal-950 via-slate-900 to-emerald-950",
    iconColor: "text-emerald-400",
    icon: Smartphone,
  },
  TABLET: {
    gradient: "from-rose-950 via-slate-900 to-amber-950",
    iconColor: "text-amber-400",
    icon: Tablet,
  },
};

export default function DeviceImage({ category, className }) {
  const theme = IMAGE_THEMES[category?.toUpperCase()] ?? IMAGE_THEMES.LAPTOP;
  const Icon = theme.icon;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center bg-gradient-to-tr overflow-hidden border-b border-border/40 select-none",
        theme.gradient,
        className
      )}
    >
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      
      {/* Centered Glassmorphic Icon Container */}
      <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/20">
        <Icon className={cn("w-8 h-8 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]", theme.iconColor)} />
      </div>

      {/* Decorative ambient glowing lights */}
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-primary/20 blur-2xl" />
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
    </div>
  );
}
