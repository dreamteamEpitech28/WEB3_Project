import { Check, Lock, ShieldCheck, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WatchStatus } from "@/types";

interface StatusGridProps {
  status?: WatchStatus;
}

export function StatusGrid({ status }: StatusGridProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Statut de la pièce</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatusItem
            icon={Check}
            label="Authenticité matière"
            active={status?.materialsVerified}
          />
          <StatusItem
            icon={UserCheck}
            label="Propriétaire légitime"
            active={status?.ownerLegitimate}
          />
          <StatusItem
            icon={ShieldCheck}
            label="VIP Soulbound"
            active={Boolean(status?.vipSoulbound)}
          />
          <StatusItem
            icon={Lock}
            label={`Transfert verrouillé ${status?.transferLocked ?? "—"}`}
            active={Boolean(status?.transferLocked)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface StatusItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}

function StatusItem({ icon: Icon, label, active }: StatusItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`h-9 w-9 rounded-full flex items-center justify-center border text-xs ${
          active
            ? "border-gold-400/60 text-gold-400 bg-black/50"
            : "border-white/10 text-silver-300/70 bg-black/30"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-xs leading-snug text-silver-300">{label}</div>
    </div>
  );
}

