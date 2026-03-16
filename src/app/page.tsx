"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function LoginMockPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-black px-6">
      <div className="max-w-xl w-full glassmorphism rounded-3xl p-10 text-center space-y-10">
        <div className="space-y-4">
          <div className="text-xs tracking-[0.32em] uppercase text-silver-300/60">
            ChronoX Atelier
          </div>
          <h1 className="text-3xl md:text-4xl font-serif luxury-gold">
            Accès au passeport digital
          </h1>
          <p className="text-sm text-silver-300/80">
            Espace client privé pour montres certifiées. Connexion invisible via
            passeport chiffré.
          </p>
        </div>

        <motion.div
          className="glassmorphism rounded-2xl p-6 space-y-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-xs text-silver-300/70 mb-2">
            Simulation accès sécurisé (UX uniquement)
          </div>
          <Button asChild size="lg" className="w-full">
            <Link href="/passport/1">Ouvrir le passeport #000001</Link>
          </Button>
          <p className="text-[0.7rem] text-silver-300/60">
            Aucun wallet ni adresse publique n&apos;est affiché dans cette démonstration.
          </p>
        </motion.div>
      </div>
    </main>
  );
}

