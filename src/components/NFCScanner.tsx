import { useState } from "react";
import { motion } from "framer-motion";
import { Waves, ScanLine, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function NFCScanner() {
  const [status, setStatus] = useState<"idle" | "scanning" | "validated">("idle");

  const handleScan = () => {
    setStatus("scanning");
    setTimeout(() => {
      setStatus("validated");
      setTimeout(() => setStatus("idle"), 1800);
    }, 900);
  };

  const isScanning = status === "scanning";
  const isValidated = status === "validated";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan NFC discret</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2 text-xs text-silver-300">
            <p className="text-silver-300/80">
              Approchez la montre du smartphone pour ouvrir le passeport sans afficher
              d&apos;adresse publique.
            </p>
            <p className="text-silver-300/60">
              Lien chiffré, aucune donnée visible sur l&apos;écran de verrouillage.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <motion.div
              className="relative h-14 w-14 rounded-2xl border border-white/15 bg-black/60 flex items-center justify-center overflow-hidden"
              animate={
                isScanning
                  ? { boxShadow: "0 0 40px rgba(240,230,140,0.4)" }
                  : { boxShadow: "0 0 0 rgba(0,0,0,0)" }
              }
              transition={{ duration: 0.2 }}
            >
              {isValidated ? (
                <CheckCircle2 className="h-6 w-6 text-gold-400" />
              ) : (
                <>
                  <Waves className="h-6 w-6 text-silver-300" />
                  {isScanning && (
                    <motion.div
                      className="absolute inset-0 border-t border-gold-400/70"
                      initial={{ y: "100%" }}
                      animate={{ y: "-100%" }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    >
                      <ScanLine className="h-4 w-4 text-gold-400/80 mx-auto mt-3" />
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleScan}
              disabled={isScanning}
              className="text-[0.7rem]"
            >
              {isValidated
                ? "Passeport vérifié"
                : isScanning
                ? "Scanning sécurisé…"
                : "Simuler un scan NFC"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

