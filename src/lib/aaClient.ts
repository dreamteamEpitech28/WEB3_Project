/**
 * Client Account Abstraction (ERC-4337) avec ZeroDev
 * 
 * Ce module gère l'expérience "invisible" pour l'utilisateur :
 * - Génération automatique d'une clé privée locale (jamais de seed phrase affichée)
 * - Création d'un Smart Account (portefeuille programmable) via ZeroDev
 * - Transactions gasless via Paymaster sponsorisé par la marque (ZeroDev)
 */

import {
  constants,
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
} from "@zerodev/sdk";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { createPublicClient, http, type Address, type Hash } from "viem";
import { baseSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

// Types pour l'API simple exposée au reste de l'application
export interface SmartAccountClient {
  address: Address;
  sendTransaction: (params: { to: Address; data: Hash; value?: bigint }) => Promise<Hash>;
  getAddress: () => Address;
}

// Stockage local de la clé privée (jamais affichée à l'utilisateur)
const STORAGE_KEY = "watch_passport_private_key";

/**
 * Génère ou récupère une clé privée de manière invisible
 * Stockée localement, jamais affichée à l'utilisateur
 */
function getOrCreatePrivateKey(): `0x${string}` {
  if (typeof window === "undefined") {
    // Côté serveur : génère une clé temporaire (ne sera pas utilisée)
    return "0x0000000000000000000000000000000000000000000000000000000000000001" as `0x${string}`;
  }

  let privateKey = localStorage.getItem(STORAGE_KEY);

  if (!privateKey) {
    // Génération d'une clé privée aléatoire (cryptographiquement sécurisée)
    const randomBytes = new Uint8Array(32);
    crypto.getRandomValues(randomBytes);
    privateKey = "0x" + Array.from(randomBytes)
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
    localStorage.setItem(STORAGE_KEY, privateKey);
  }

  return privateKey as `0x${string}`;
}

/**
 * Initialise le Smart Account avec ZeroDev
 * 
 * Cette fonction :
 * 1. Récupère ou génère la clé privée locale
 * 2. Crée un compte ECDSA à partir de cette clé
 * 3. Configure le validator ZeroDev
 * 4. Crée le Smart Account
 * 5. Configure le Paymaster pour les transactions gasless
 * 6. Retourne un client prêt à envoyer des transactions
 */
export async function initSmartAccount(): Promise<SmartAccountClient> {
  const projectId = process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID;
  const alchemyRpcUrl = process.env.NEXT_PUBLIC_ALCHEMY_BASE_SEPOLIA_RPC_URL;
  const zerodevBundlerUrl =
    process.env.NEXT_PUBLIC_ZERODEV_BUNDLER_URL ||
    (projectId
      ? `https://rpc.zerodev.app/api/v3/${projectId}/chain/84532`
      : undefined);
  const zerodevPaymasterUrl = projectId
    ? `https://rpc.zerodev.app/api/v2/paymaster/${projectId}`
    : undefined;

  if (!projectId) {
    throw new Error(
      "NEXT_PUBLIC_ZERODEV_PROJECT_ID manquant. Configurez-le dans .env.local"
    );
  }

  if (!alchemyRpcUrl) {
    throw new Error(
      "NEXT_PUBLIC_ALCHEMY_BASE_SEPOLIA_RPC_URL manquant. Configurez-le dans .env.local"
    );
  }

  if (!zerodevBundlerUrl) {
    throw new Error(
      "NEXT_PUBLIC_ZERODEV_BUNDLER_URL manquant. Configurez-le dans .env.local"
    );
  }
  if (!zerodevPaymasterUrl) {
    throw new Error(
      "URL Paymaster ZeroDev introuvable (Project ID). Configurez NEXT_PUBLIC_ZERODEV_PROJECT_ID dans .env.local"
    );
  }
  // 1. Récupération de la clé privée locale (invisible pour l'utilisateur)
  const privateKey = getOrCreatePrivateKey();
  const eoaAccount = privateKeyToAccount(privateKey);

  // 2. Client de lecture (RPC Alchemy, pour les données chaîne & confirmations)
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(alchemyRpcUrl),
  });

  // 3. EntryPoint & validator ECDSA (Kernel v0.3.1 / EntryPoint v0.7)
  const entryPoint = constants.getEntryPoint("0.7");
  const kernelVersion = "0.3.1" as const;

  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer: eoaAccount,
    entryPoint,
    kernelVersion,
  });

  // 4. Création du Smart Account (Kernel)
  const kernelAccount = await createKernelAccount(publicClient, {
    entryPoint,
    kernelVersion,
    plugins: {
      sudo: ecdsaValidator,
    },
  });

  // 5. Paymaster sponsorisé (gasless)
  const paymasterClient = createZeroDevPaymasterClient({
    chain: baseSepolia,
    transport: http(zerodevPaymasterUrl),
  });

  // 6. Client AA (Bundler ZeroDev) + Paymaster
  const kernelClient = createKernelAccountClient({
    account: kernelAccount,
    chain: baseSepolia,
    client: publicClient,
    bundlerTransport: http(zerodevBundlerUrl),
    paymaster: {
      getPaymasterData: paymasterClient.getPaymasterData,
      getPaymasterStubData: paymasterClient.getPaymasterStubData,
    },
  });

  // 7. Retour d'une API simple et propre
  return {
    address: kernelAccount.address,
    getAddress: () => kernelAccount.address,
    sendTransaction: async ({ to, data, value = 0n }) => {
      const hash = await kernelClient.sendTransaction({
        to,
        data: data as `0x${string}`,
        value,
      });

      // Attendre la confirmation de la transaction (RPC Alchemy)
      await publicClient.waitForTransactionReceipt({ hash });

      return hash;
    },
  };
}

/**
 * Récupère l'adresse du Smart Account sans initialiser complètement
 * Utile pour vérifier si un compte existe déjà
 */
export async function getSmartAccountAddress(): Promise<Address | null> {
  try {
    const client = await initSmartAccount();
    return client.address;
  } catch {
    return null;
  }
}
