import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "@/components/Providers";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Maison Lumière — Digital Passport",
  description: "Passeport numérique invisible pour haute horlogerie.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-black text-white">
        <Providers>
          <div className="min-h-screen relative overflow-x-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-64 left-1/3 h-[700px] w-[700px] rounded-full bg-gold-400/10 blur-3xl" />
              <div className="absolute -bottom-72 right-1/4 h-[760px] w-[760px] rounded-full bg-slate-500/20 blur-3xl" />
              <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.22)_1px,transparent_0)] [background-size:24px_24px]" />
            </div>

            <header className="relative z-10 sticky top-0 backdrop-blur-2xl bg-black/30 border-b border-white/5">
              <div className="container-luxe py-4 flex items-center justify-between">
                <Link href="/" className="group">
                  <div className="kicker">Maison Lumière</div>
                  <div className="luxury-gold text-lg font-serif leading-tight">
                    Private Client
                  </div>
                </Link>

                <nav className="flex items-center gap-2">
                  <NavPill href="/buy" label="Collection" />
                  <NavPill href="/passport/1" label="Passeport" />
                </nav>
              </div>
            </header>

            <div className="relative z-10">{children}</div>

            <footer className="relative z-10">
              <div className="container-luxe py-10">
                <div className="hairline" />
                <div className="pt-8 text-[0.7rem] text-silver-300/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                  <span>Expérience invisible · Aucun wallet imposé</span>
                  <span>Base Sepolia · IPFS · NFC</span>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

function NavPill({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-4 py-2 text-xs tracking-[0.22em] uppercase transition-colors",
        "border border-white/10 bg-black/30 text-silver-200 hover:text-gold-400 hover:border-gold-400/40"
      )}
    >
      {label}
    </Link>
  );
}

