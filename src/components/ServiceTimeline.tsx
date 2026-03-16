import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ServiceEvent } from "@/types";
import { motion } from "framer-motion";

interface ServiceTimelineProps {
  history?: ServiceEvent[];
}

export function ServiceTimeline({ history }: ServiceTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique atelier</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-4">
          <div className="absolute left-1 top-0 bottom-0 w-px bg-gradient-to-b from-gold-400/60 via-zinc-600 to-transparent" />
          <div className="space-y-4">
            {history?.map((event, index) => (
              <motion.div
                key={`${event.date}-${event.type}`}
                className="relative flex gap-4"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18, delay: index * 0.03 }}
              >
                <div className="mt-1 h-2 w-2 rounded-full bg-gold-400 shadow-watch-glow" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-silver-300">
                    <span className="font-medium">{event.type}</span>
                    <span className="text-[0.65rem] text-silver-300/70">
                      {event.location}
                    </span>
                  </div>
                  <div className="text-[0.7rem] text-silver-300/80">
                    {event.date} · Statut {event.status}
                  </div>
                </div>
              </motion.div>
            )) ?? (
              <div className="text-xs text-silver-300/70">
                Aucun passage en atelier enregistré pour le moment.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

