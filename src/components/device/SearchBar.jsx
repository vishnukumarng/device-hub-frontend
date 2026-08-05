import { Search } from "lucide-react";
import Input from "../ui/Input";

export default function SearchBar({ value, onChange, placeholder = "Search devices..." }) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10 h-10 bg-white/[0.03] border-border/80 focus-visible:bg-black/30 placeholder:text-muted-foreground/60 transition-colors"
      />
    </div>
  );
}
