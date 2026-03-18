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
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="text-center space-y-3">
          <div className="text-xs tracking-[0.32em] uppercase text-silver-300/60">
            Maison Lumière
          </div>
          <h1 className="text-3xl md:text-4xl font-serif luxury-gold">
            Acquisition — Passeport numérique
          </h1>
          <p className="text-sm text-silver-300/80 max-w-2xl mx-auto">
            Transaction invisible et gas sponsorisé par la marque. Aucun wallet ni adresse publique
            affiché à l&apos;écran.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {watches.map((w) => {
            const isPending = pendingTokenId === w.tokenId;
            const disabled = isPending || isInitializing;
            return (
              <motion.div
                key={w.tokenId}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-silver-300">
                      {w.title}{" "}
                      <span className="text-silver-300/60 font-normal">{w.subtitle}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-5">
                    <div className="h-28 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black watch-glow" />
                    <div className="text-xs text-silver-300/70">{w.summary}</div>
                    <Button
                      className="w-full"
                      onClick={() => handleAcquire(w.tokenId)}
                      disabled={disabled}
                    >
                      {isPending
                        ? "Acquisition…"
                        : watchPassportContract
                        ? "Acquérir"
                        : "Acquérir (démo)"}
                    </Button>
                    {!watchPassportContract && (
                      <p className="text-[0.7rem] text-silver-300/60">
                        Configure `NEXT_PUBLIC_WATCH_PASSPORT_CONTRACT_ADDRESS` pour activer le mint
                        gasless.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

