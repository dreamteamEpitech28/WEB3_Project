import { baseSepolia } from "viem/chains";
import { createConfig, http } from "wagmi";

/**
 * Configuration wagmi avec Alchemy RPC pour Base Sepolia
 * 
 * Pour la production, utilisez votre URL Alchemy depuis .env.local :
 * NEXT_PUBLIC_ALCHEMY_BASE_SEPOLIA_RPC_URL
 */
const alchemyRpcUrl = 
  process.env.NEXT_PUBLIC_ALCHEMY_BASE_SEPOLIA_RPC_URL || 
  // Fallback vers RPC public si Alchemy n'est pas configuré
  `https://base-sepolia.g.alchemy.com/v2/demo`;

export const config = createConfig({
  chains: [baseSepolia], // Focus sur Base Sepolia pour le projet
  transports: {
    [baseSepolia.id]: http(alchemyRpcUrl),
  },
});

export const erc721ABI = [
  { name: "tokenURI", inputs: [{ type: "uint256" }], outputs: [{ type: "string" }] },
  { name: "ownerOf", inputs: [{ type: "uint256" }], outputs: [{ type: "address" }] },
] as const;

