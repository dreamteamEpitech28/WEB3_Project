"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSmartAccount } from "@/components/AAInitializer";
import { createWatchPassport } from "@/lib/contractHelpers";
import type { Address } from "viem";

type WatchItem = {
  tokenId: number;
  title: string;
  subtitle: string;
  summary: string;
};

export default function BuyPage() {
  const router = useRouter();
  const { smartAccount, isReady, isInitializing } = useSmartAccount();
  const [pendingTokenId, setPendingTokenId] = useState<number | null>(null);

  const watchPassportContract = process.env
    .NEXT_PUBLIC_WATCH_PASSPORT_CONTRACT_ADDRESS as Address | undefined;

  const watches = useMemo<WatchItem[]>(
    () => [
      {
        tokenId: 1,
        title: "Maison Lumière — Calibre Noir",
        subtitle: "#001",
        summary: "Titane grade 5 · Manufacture · 2026",
      },
      {
        tokenId: 2,
        title: "Maison Lumière — Calibre Bleu",
        subtitle: "#002",
        summary: "Titane · 72h réserve · 2026",
      },
      {
        tokenId: 3,
        title: "Maison Lumière — Édition Atelier",
        subtitle: "#003",
        summary: "Série limitée · Certifiée · 2026",
      },
    ],
    []
  );

  async function handleAcquire(tokenId: number) {
    setPendingTokenId(tokenId);

    try {
      // Mode démo si AA non prêt ou contrat non configuré : on simule l'acquisition
      if (!isReady || !smartAccount || !watchPassportContract) {
        router.push(`/passport/${tokenId}`);
        return;
      }

      await createWatchPassport(
        watchPassportContract,
        smartAccount.address,
        BigInt(tokenId),
        smartAccount
      );

      router.push(`/passport/${tokenId}`);
    } finally {
      setPendingTokenId(null);
    }
  }

  return (
    <main className="py-16 md:py-20">
      <section className="container-luxe">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="kicker">Collection certifiée</div>
            <h1 className="mt-4 text-4xl md:text-6xl font-serif leading-[1.02]">
              La <span className="luxury-gold">pièce</span>.
              <br />
              Le <span className="luxury-gold">passeport</span>.
            </h1>
            <p className="mt-5 text-sm md:text-base text-silver-300/80 leading-relaxed max-w-xl">
              Acquisition premium et invisible : la marque sponsorise la transaction, puis vous
              recevez votre passeport numérique instantanément.
            </p>
          </motion.div>

          <motion.aside
            className="lg:col-span-5 glassmorphism rounded-3xl p-7 md:p-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
          >
            <div className="kicker">Parcours</div>
            <div className="mt-4 space-y-3 text-sm text-silver-200">
              <Step n="01" t="Acquérir" d="Transaction sponsorisée (gasless)" />
              <Step n="02" t="Scanner NFC" d="Lien signé, anti‑rejeu" />
              <Step n="03" t="Consulter" d="Métadonnées IPFS + statut" />
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button className="btn-luxe w-full" onClick={() => router.push("/passport/1")}>
                Voir un exemple
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => router.push("/")}>
                Accueil
              </Button>
            </div>
          </motion.aside>
        </div>

        <div className="mt-12 md:mt-16">
          <div className="hairline mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {watches.map((w) => {
              const isPending = pendingTokenId === w.tokenId;
              const disabled = isPending || isInitializing;

              return (
                <motion.div
                  key={w.tokenId}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -6 }}
                >
                  <Card className="h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <CardTitle className="text-silver-200 text-sm leading-snug">
                          {w.title}
                        </CardTitle>
                        <div className="text-[0.65rem] tracking-[0.22em] uppercase text-silver-300/60">
                          {w.subtitle}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-5">
                      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-6">
                        <div className="flex items-center justify-between">
                          <div className="kicker">Atelier</div>
                          <div className="text-[0.65rem] tracking-[0.22em] uppercase text-silver-300/60">
                            Certifié
                          </div>
                        </div>
                        <div className="mt-6 h-28 w-full rounded-2xl border border-white/10 bg-black/40 watch-glow" />
                      </div>

                      <div className="text-sm text-silver-300/85 leading-relaxed">
                        {w.summary}
                      </div>

                      <Button
                        className="btn-luxe w-full"
                        onClick={() => handleAcquire(w.tokenId)}
                        disabled={disabled}
                      >
                        {isPending
                          ? "Acquisition…"
                          : watchPassportContract
                          ? "Acquérir"
                          : "Acquérir (démo)"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {!watchPassportContract && (
            <div className="mt-8 text-[0.75rem] text-silver-300/60 leading-relaxed max-w-3xl">
              Mode démo actif. Pour activer le mint gasless, configure{" "}
              <span className="text-silver-200">NEXT_PUBLIC_WATCH_PASSPORT_CONTRACT_ADDRESS</span>.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Step({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-9 w-9 rounded-full border border-white/10 bg-black/30 flex items-center justify-center text-[0.7rem] tracking-[0.22em] uppercase text-silver-300/70">
        {n}
      </div>
      <div>
        <div className="luxury-gold font-serif text-base leading-tight">{t}</div>
        <div className="text-xs text-silver-300/70 leading-relaxed mt-1">{d}</div>
      </div>
    </div>
  );
}

