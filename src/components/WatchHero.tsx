import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { WatchPassport } from "@/types";

interface WatchHeroProps {
  watch?: WatchPassport;
}

export function WatchHero({ watch }: WatchHeroProps) {
  if (!watch) {
    return (
      <div className="h-full flex items-center justify-center text-silver-300">
        Chargement du passeport...
      </div>
    );
  }

  return (
    <motion.div
      className="relative glassmorphism rounded-3xl p-10 lg:p-12 overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-slate-500/20 blur-3xl" />
      </div>

      <div className="relative flex flex-col lg:flex-row gap-10 items-start">
        <motion.div
          className="relative mx-auto lg:mx-0"
          initial={{ rotateX: 10, rotateY: -12, scale: 0.96 }}
          animate={{ rotateX: 0, rotateY: 0, scale: 1 }}
          whileHover={{ rotateX: 6, rotateY: 6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <div className="relative h-64 w-64 rounded-full border border-white/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black watch-glow flex items-center justify-center">
            <div className="absolute inset-6 rounded-full border border-white/10" />
            <div className="absolute inset-12 rounded-full border border-white/5" />
            <div className="relative z-10 flex flex-col items-center gap-1">
              <span className="text-[0.65rem] tracking-[0.28em] uppercase text-silver-300">
                ChronoX Atelier
              </span>
              <span className="text-2xl font-serif text-gold-400">
                {watch.model}
              </span>
              <span className="text-[0.65rem] tracking-[0.35em] uppercase text-silver-300/80 mt-4">
                Digital Passport
              </span>
              <span className="text-xs text-silver-300/70 mt-1">
                SN {watch.serialNumber}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="relative flex-1 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="gold">Propriétaire certifié</Badge>
            <Badge tone="silver">ERC-721 ChronoX</Badge>
            <Badge tone="neutral">Token #{watch.tokenId}</Badge>
          </div>

          <div className="space-y-3">
            <div className="text-xs tracking-[0.32em] uppercase text-silver-300/70">
              Détails techniques
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <Spec label="Matière" value={watch.metadata.material} />
              <Spec label="Calibre" value={watch.metadata.caliber} />
              <Spec label="Année" value={String(watch.metadata.year)} />
              <Spec label="Poids" value={watch.metadata.weight} />
              <Spec label="Étanchéité" value={watch.metadata.waterproof} />
              <Spec label="Boîtier" value={watch.metadata.caseSize} />
            </div>
          </div>

          <div className="text-xs text-silver-300/70">
            IPFS: <span className="text-silver-300">{watch.metadata.ipfsHash}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="text-[0.65rem] uppercase tracking-[0.22em] text-silver-300/60">
        {label}
      </div>
      <div className="text-sm text-silver-300">{value}</div>
    </div>
  );
}

