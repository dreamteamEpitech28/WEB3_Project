"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function LoginMockPage() {
  return (
    <main>
      <section className="container-luxe pt-14 md:pt-20 pb-12">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="kicker">Haute horlogerie · Passeport numérique</div>
              <h1 className="text-4xl md:text-6xl font-serif leading-[1.05]">
                <span className="luxury-gold">Engineering</span> Invisible Luxury.
              </h1>
              <p className="text-sm md:text-base text-silver-300/80 leading-relaxed max-w-xl">
                Une expérience client fluide et rassurante&nbsp;: acquisition gasless, scan NFC
                sécurisé, métadonnées IPFS — sans extension wallet, sans adresse publique à l’écran.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="btn-luxe">
                  <Link href="/buy">Découvrir la collection</Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="w-full sm:w-auto">
                  <Link href="/passport/1">Voir un passeport</Link>
                </Button>
              </div>

              <div className="text-[0.7rem] text-silver-300/60 leading-relaxed">
                Aucun wallet ni adresse 0x n’est affiché pendant la démo. Le sponsoring des frais est
                géré côté marque.
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="glassmorphism rounded-3xl p-8 md:p-10"
            >
              <div className="flex items-center justify-between">
                <div className="kicker">Exemple</div>
                <div className="text-xs text-silver-300/70 tracking-[0.18em] uppercase">
                  #000001
                </div>
              </div>
              <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-6">
                <div className="flex items-center gap-5">
                  <div className="h-20 w-20 rounded-full border border-white/15 bg-black/40 watch-glow" />
                  <div className="space-y-1">
                    <div className="luxury-gold text-xl font-serif">Calibre Noir</div>
                    <div className="text-xs text-silver-300/70 tracking-[0.22em] uppercase">
                      Propriétaire certifié
                    </div>
                    <div className="text-xs text-silver-300/70">Scan NFC · IPFS · Base Sepolia</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid sm:grid-cols-3 gap-3">
                {[
                  { k: "Acquisition", v: "Gasless" },
                  { k: "Vérification", v: "NFC" },
                  { k: "Métadonnées", v: "IPFS" },
                ].map((x) => (
                  <div
                    key={x.k}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                  >
                    <div className="text-[0.65rem] tracking-[0.22em] uppercase text-silver-300/60">
                      {x.k}
                    </div>
                    <div className="text-sm text-silver-200 mt-1">{x.v}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container-luxe pb-20">
        <div className="hairline mb-10" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              t: "Aucune friction",
              d: "Pas d’extension wallet, pas de seed phrase, pas d’adresse publique visible.",
            },
            {
              t: "Authenticité instantanée",
              d: "Scan NFC sécurisé (anti-rejeu) pour ouvrir le passeport et vérifier la pièce.",
            },
            {
              t: "Traçabilité premium",
              d: "Métadonnées et historique exploitables pour service, revente et assurance.",
            },
          ].map((c) => (
            <div key={c.t} className="glassmorphism rounded-3xl p-7">
              <div className="luxury-gold text-xl font-serif mb-2">{c.t}</div>
              <div className="text-sm text-silver-300/80 leading-relaxed">{c.d}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

