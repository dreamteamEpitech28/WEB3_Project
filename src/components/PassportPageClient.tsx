'use client';

import { WatchHero } from "@/components/WatchHero";
import { StatusGrid } from "@/components/StatusGrid";
import { ServiceTimeline } from "@/components/ServiceTimeline";
import { NFCScanner } from "@/components/NFCScanner";
import { useWatchData } from "@/lib/useWatchData";

interface PassportPageClientProps {
  id: string;
}

export function PassportPageClient({ id }: PassportPageClientProps) {
  const { data: watch } = useWatchData(id);

  return (
    <div className="container-luxe">
      <div className="glassmorphism rounded-3xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="kicker">Passeport numérique</div>
            <div className="luxury-gold text-3xl md:text-5xl font-serif mt-3 leading-tight">
              Digital Passport
            </div>
            <div className="text-sm text-silver-300/70 mt-3">
              Consultation privée · sans adresse publique affichée
            </div>
          </div>

          <div className="glassmorphism rounded-2xl px-5 py-4">
            <div className="text-[0.65rem] tracking-[0.28em] uppercase text-silver-300/60">
              Référence
            </div>
            <div className="text-sm text-silver-200 mt-1">
              Token #{watch?.tokenId ?? id}
            </div>
          </div>
        </div>

        {/* HERO (full width) */}
        <div className="mb-8 md:mb-10">
          <WatchHero watch={watch} />
        </div>

        {/* SUPPORTING BLOCKS */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <StatusGrid status={watch?.status} />
            <ServiceTimeline history={watch?.serviceHistory} />
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <NFCScanner />
              <div className="glassmorphism rounded-3xl p-6">
                <div className="kicker">Données</div>
                <div className="mt-3 text-sm text-silver-200 leading-relaxed">
                  Métadonnées et certificat consultables sans friction. La marque sponsorise les
                  opérations sensibles.
                </div>
                <div className="mt-4 text-[0.75rem] text-silver-300/60 leading-relaxed">
                  IPFS CID: <span className="text-silver-200">{watch?.metadata.ipfsHash ?? "—"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

