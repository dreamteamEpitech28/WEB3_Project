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
    <div className="glassmorphism max-w-6xl mx-auto p-8 md:p-12 rounded-3xl my-8 md:my-12">
      <div className="luxury-gold text-3xl md:text-5xl font-serif mb-10 md:mb-16 text-center">
        Digital Passport
      </div>

      <div className="grid lg:grid-cols-12 gap-10 md:gap-12">
        <div className="lg:col-span-7">
          <WatchHero watch={watch} />
        </div>

        <div className="lg:col-span-5 space-y-6 md:space-y-8">
          <StatusGrid status={watch?.status} />
          <ServiceTimeline history={watch?.serviceHistory} />
          <NFCScanner />
        </div>
      </div>
    </div>
  );
}

