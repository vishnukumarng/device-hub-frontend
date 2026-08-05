import { Cpu, MapPin, Hash, ShieldAlert } from "lucide-react";
import Card, { CardContent } from "../ui/Card";
import StatusBadge from "../common/StatusBadge";
import DeviceImage from "./DeviceImage";

export default function DeviceCard({ device }) {
  const { name, category, status, serialNumber, location, specs } = device;

  return (
    <Card className="overflow-hidden border-border/80 bg-card">
      <DeviceImage name={name} category={category} className="h-44 w-full" />
      <CardContent className="p-4 space-y-4">
        <div>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-white leading-tight">{name}</h2>
            <StatusBadge status={status} />
          </div>
          <p className="text-xs text-muted-foreground mt-1 capitalize">{category?.toLowerCase()}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/50 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Hash className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">S/N: <strong className="text-white font-medium">{serialNumber || "N/A"}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Loc: <strong className="text-white font-medium">{location || "Office"}</strong></span>
          </div>
        </div>

        {specs && specs.length > 0 && (
          <div className="pt-3 border-t border-border/50 space-y-2">
            <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-primary" /> Specifications
            </h4>
            <ul className="grid grid-cols-1 gap-1.5 pl-5 list-disc text-xs text-muted-foreground">
              {specs.map((spec, i) => (
                <li key={i}>{spec}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
