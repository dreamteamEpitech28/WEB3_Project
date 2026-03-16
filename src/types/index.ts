export interface WatchMetadata {
  material: string;
  caliber: string;
  year: number;
  weight: string;
  waterproof: string;
  caseSize: string;
  ipfsHash: string;
}

export interface ServiceEvent {
  date: string;
  location: string;
  type: string;
  status: string;
}

export interface WatchStatus {
  vipSoulbound: boolean;
  transferLocked: string;
  materialsVerified: boolean;
  ownerLegitimate: boolean;
}

export interface WatchPassport {
  tokenId: string;
  contract: string;
  owner: string;
  model: string;
  serialNumber: string;
  metadata: WatchMetadata;
  serviceHistory: ServiceEvent[];
  status: WatchStatus;
}

