import { Cpu, MapPin, Hash, ShieldAlert } from "lucide-react";
import Card, { CardContent } from "../ui/Card";
import StatusBadge from "../common/StatusBadge";
import DeviceImage from "./DeviceImage";

export default function DeviceCard({ device }) {
  const { name, category, status, serialNumber, location, specs } = device;

  return (
    <Card className="overflow-hidden border border-border/80 bg-card shadow-xs">
      <DeviceImage name={name} category={category} className="h-48 w-full" />
      <CardContent className="p-5 space-y-4">
        <div>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-foreground leading-tight">{name}</h2>
            <StatusBadge status={status} />
          </div>
          <p className="text-xs text-muted-foreground mt-1 capitalize font-medium">{category?.toLowerCase()}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/80 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Hash className="w-3.5 h-3.5 shrink-0 text-primary" />
            <span className="truncate">S/N: <strong className="text-foreground font-semibold">{serialNumber || "N/A"}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-primary" />
            <span className="truncate">Loc: <strong className="text-foreground font-semibold">{location || "Office"}</strong></span>
          </div>
        </div>

        {specs && specs.length > 0 && (
          <div className="pt-3 border-t border-border/80 space-y-2.5">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-primary" /> Specifications
            </h4>
            <ul className="grid grid-cols-1 gap-2 pl-4 list-disc text-xs text-muted-foreground">
              {specs.map((spec, i) => (
                <li key={i} className="leading-relaxed">{spec}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>

  );
}
