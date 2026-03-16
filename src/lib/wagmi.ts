import { http, createConfig } from "viem";
import { sepolia, baseSepolia } from "viem/chains";

export const config = createConfig({
  chains: [sepolia, baseSepolia],
  transports: {
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
});

export const erc721ABI = [
  { name: "tokenURI", inputs: [{ type: "uint256" }], outputs: [{ type: "string" }] },
  { name: "ownerOf", inputs: [{ type: "uint256" }], outputs: [{ type: "address" }] },
] as const;

