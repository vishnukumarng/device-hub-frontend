import { cn } from "../../lib/utils";

export default function MainContainer({ children, className }) {
  return (
    <div
      className={cn(
        "w-full max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-4 py-6 md:py-8 min-h-[calc(100vh-4rem)] flex flex-col pb-24 md:pb-8",
        className
      )}
    >
      {children}
    </div>
  );
}
