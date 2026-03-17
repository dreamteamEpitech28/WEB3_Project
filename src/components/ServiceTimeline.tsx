import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ServiceEvent } from "@/types";
import { motion } from "framer-motion";

interface ServiceTimelineProps {
  history?: ServiceEvent[];
}

export function ServiceTimeline({ history }: ServiceTimelineProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Historique atelier</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="relative pl-4 pr-2">
          <div className="absolute left-1 top-0 bottom-0 w-px bg-gradient-to-b from-gold-400/60 via-zinc-600 to-transparent" />
          <div className="space-y-3">
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
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs text-silver-300">
                    <span className="font-medium leading-snug">{event.type}</span>
                    <span className="text-[0.65rem] text-silver-300/70 leading-snug">
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

