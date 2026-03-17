'use client';

import { useEffect, useState, createContext, useContext, type ReactNode } from "react";
import { initSmartAccount, type SmartAccountClient } from "@/lib/aaClient";

/**
 * Contexte React pour exposer le Smart Account au reste de l'application
 * Sans jamais afficher d'adresse ou de jargon technique à l'utilisateur
 */
interface AAContextType {
  smartAccount: SmartAccountClient | null;
  isInitializing: boolean;
  isReady: boolean;
}

const AAContext = createContext<AAContextType>({
  smartAccount: null,
  isInitializing: false,
  isReady: false,
});

export const useSmartAccount = () => useContext(AAContext);

/**
 * Composant invisible qui initialise le Smart Account au chargement
 * 
 * Ce composant :
 * - Ne rend rien visuellement (expérience invisible)
 * - Initialise automatiquement le Smart Account à la première visite
 * - Gère les erreurs silencieusement
 * - Expose le client via un contexte React pour le reste de l'app
 */
export function AAInitializer({ children }: { children: ReactNode }) {
  const [smartAccount, setSmartAccount] = useState<SmartAccountClient | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      try {
        setIsInitializing(true);
        const client = await initSmartAccount();
        
        if (mounted) {
          setSmartAccount(client);
          setIsReady(true);
          setIsInitializing(false);
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation du compte intelligent:", error);
        // En production, vous pourriez vouloir logger cette erreur
        // mais ne jamais l'afficher à l'utilisateur avec du jargon technique
        if (mounted) {
          setIsInitializing(false);
        }
      }
    }

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AAContext.Provider value={{ smartAccount, isInitializing, isReady }}>
      {children}
    </AAContext.Provider>
  );
}
