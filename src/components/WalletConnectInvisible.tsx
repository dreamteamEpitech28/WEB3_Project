'use client';

import { useEffect } from "react";
import { useAccount, useConnect } from "wagmi";

/**
 * Composant silencieux qui prépare les hooks wagmi
 * sans jamais afficher de bouton ou d'adresse.
 */
export function WalletConnectInvisible() {
  const { isConnected } = useAccount();
  const { connectors } = useConnect();

  useEffect(() => {
    // Prépare les connecteurs pour un futur usage (Day 2)
    void connectors;
    void isConnected;
  }, [connectors, isConnected]);

  return null;
}

