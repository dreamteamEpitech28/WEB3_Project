/**
 * Helpers pour interagir avec les contrats via le Smart Account
 * 
 * Ces fonctions encapsulent toute la complexité technique et exposent
 * une API simple et claire pour le reste de l'application.
 * 
 * IMPORTANT : Aucun jargon technique dans les noms de fonctions ou messages d'erreur
 * qui pourraient être vus par l'utilisateur final.
 */

import { encodeFunctionData, type Address, type Hash } from "viem";
import { useSmartAccount } from "@/components/AAInitializer";

// ABI simplifiés pour les contrats (extraits des interfaces principales)
const WATCH_PASSPORT_ABI = [
  {
    name: "mint",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "ownerOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "address" }],
  },
] as const;

const SPARE_PARTS_ABI = [
  {
    name: "mint",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "id", type: "uint256" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "mintBatch",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "ids", type: "uint256[]" },
      { name: "amounts", type: "uint256[]" },
    ],
    outputs: [],
  },
] as const;

const VIP_IDENTITY_ABI = [
  {
    name: "mint",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
    outputs: [],
  },
] as const;

/**
 * Crée un passeport numérique pour une montre
 * 
 * Cette fonction est appelée par la marque pour certifier une montre
 * et créer son passeport numérique associé au client.
 * 
 * @param contractAddress - Adresse du contrat WatchPassport déployé
 * @param clientAddress - Adresse du Smart Account du client
 * @param watchSerialNumber - Numéro de série de la montre (utilisé comme tokenId)
 */
export async function createWatchPassport(
  contractAddress: Address,
  clientAddress: Address,
  watchSerialNumber: bigint,
  smartAccountClient: { sendTransaction: (params: { to: Address; data: Hash }) => Promise<Hash> }
): Promise<Hash> {
  const data = encodeFunctionData({
    abi: WATCH_PASSPORT_ABI,
    functionName: "mint",
    args: [clientAddress, watchSerialNumber],
  });

  return smartAccountClient.sendTransaction({
    to: contractAddress,
    data,
  });
}

/**
 * Ajoute une pièce détachée au compte du client
 * 
 * Utilisé lors d'une réparation ou d'un entretien pour enregistrer
 * les pièces remplacées dans le passeport numérique.
 * 
 * @param contractAddress - Adresse du contrat SpareParts déployé
 * @param clientAddress - Adresse du Smart Account du client
 * @param partId - Identifiant du type de pièce
 * @param quantity - Quantité de pièces ajoutées
 */
export async function addSparePart(
  contractAddress: Address,
  clientAddress: Address,
  partId: bigint,
  quantity: bigint,
  smartAccountClient: { sendTransaction: (params: { to: Address; data: Hash }) => Promise<Hash> }
): Promise<Hash> {
  const data = encodeFunctionData({
    abi: SPARE_PARTS_ABI,
    functionName: "mint",
    args: [clientAddress, partId, quantity],
  });

  return smartAccountClient.sendTransaction({
    to: contractAddress,
    data,
  });
}

/**
 * Ajoute plusieurs pièces détachées en une seule transaction
 * 
 * Optimisé pour les réparations complexes avec plusieurs pièces.
 */
export async function addSparePartsBatch(
  contractAddress: Address,
  clientAddress: Address,
  partIds: bigint[],
  quantities: bigint[],
  smartAccountClient: { sendTransaction: (params: { to: Address; data: Hash }) => Promise<Hash> }
): Promise<Hash> {
  const data = encodeFunctionData({
    abi: SPARE_PARTS_ABI,
    functionName: "mintBatch",
    args: [clientAddress, partIds, quantities],
  });

  return smartAccountClient.sendTransaction({
    to: contractAddress,
    data,
  });
}

/**
 * Accorde le statut VIP à un client
 * 
 * Cette fonction crée un token soulbound (non transférable) qui certifie
 * le statut VIP du client et son historique de service.
 * 
 * @param contractAddress - Adresse du contrat VIPIdentity déployé
 * @param clientAddress - Adresse du Smart Account du client
 * @param vipTokenId - Identifiant unique du token VIP
 */
export async function grantVipStatus(
  contractAddress: Address,
  clientAddress: Address,
  vipTokenId: bigint,
  smartAccountClient: { sendTransaction: (params: { to: Address; data: Hash }) => Promise<Hash> }
): Promise<Hash> {
  const data = encodeFunctionData({
    abi: VIP_IDENTITY_ABI,
    functionName: "mint",
    args: [clientAddress, vipTokenId],
  });

  return smartAccountClient.sendTransaction({
    to: contractAddress,
    data,
  });
}

/**
 * Hook React pour utiliser les fonctions de contrat de manière simple
 * 
 * Exemple d'utilisation :
 * ```tsx
 * const { createPassport } = useContractActions();
 * await createPassport(contractAddress, watchSerialNumber);
 * ```
 */
export function useContractActions() {
  const { smartAccount } = useSmartAccount();

  if (!smartAccount) {
    throw new Error("Le compte intelligent n'est pas encore prêt. Veuillez patienter.");
  }

  return {
    createWatchPassport: async (
      contractAddress: Address,
      clientAddress: Address,
      watchSerialNumber: bigint
    ) => {
      return createWatchPassport(contractAddress, clientAddress, watchSerialNumber, smartAccount);
    },
    addSparePart: async (
      contractAddress: Address,
      clientAddress: Address,
      partId: bigint,
      quantity: bigint
    ) => {
      return addSparePart(contractAddress, clientAddress, partId, quantity, smartAccount);
    },
    addSparePartsBatch: async (
      contractAddress: Address,
      clientAddress: Address,
      partIds: bigint[],
      quantities: bigint[]
    ) => {
      return addSparePartsBatch(contractAddress, clientAddress, partIds, quantities, smartAccount);
    },
    grantVipStatus: async (
      contractAddress: Address,
      clientAddress: Address,
      vipTokenId: bigint
    ) => {
      return grantVipStatus(contractAddress, clientAddress, vipTokenId, smartAccount);
    },
    getSmartAccountAddress: () => smartAccount.getAddress(),
  };
}
