# Passeport Numérique de Produit — Maison Lumière

> Projet fil rouge — EPITECH Tek3 · Le Web3 au service du Luxe
> Intervenant : William Derenne · Mars 2026

## Concept

Chaque montre de haute horlogerie possède un jumeau numérique sur la blockchain.
La technologie est invisible pour le client final.

## Architecture

```
Client (email/biométrie)
    ↓
Interface Web (Next.js · wagmi · viem)
    ↓
Couche invisibilité ERC-4337 (Smart Account · Bundler · Paymaster)
    ↓
Smart Contracts (ERC-721 · ERC-1155 · ERC-5192)
    ↓
Stockage décentralisé (IPFS/Pinata · Arweave)
    ↑
Pont phygital (Puce NFC · SUN)
```

## CIDs IPFS — À utiliser dans les smart contracts

| Fichier | CID |
|---------|-----|
| Image watch_001 (noire)   | `bafybeifehbwtdldyndszox4pdq6mnznimaqkttdsazes7vy7a2gae2cdfi` |
| Image watch_002 (blanche) | `bafybeieiz42dpgr2eiywr6liuhhhgqs34wlvvagrpx6mg46ctis6y65kuu` |
| JSON watch_001            | `bafkreif5plmd76ojc5xpsnbakkleuivhcnqrzvg3hcaaufiqpfosvxr4pq` |
| JSON watch_002            | `bafkreiednh3yzqqwn62wddondat33z2tj6w3tvujk2ubgytnrwsm4nf4dm` |

### URLs complètes pour les smart contracts

```
ipfs://bafkreif5plmd76ojc5xpsnbakkleuivhcnqrzvg3hcaaufiqpfosvxr4pq
ipfs://bafkreiednh3yzqqwn62wddondat33z2tj6w3tvujk2ubgytnrwsm4nf4dm
```

## Structure

```
phygital/
├── metadata/
│   ├── watch_001.json    # Métadonnées montre 1 (Calibre Noir)
│   └── watch_002.json    # Métadonnées montre 2 (Calibre Blanc)
├── nfc/
│   └── sun_generator.js  # Générateur SUN (Signed URL with NFC)
├── contracts/            # Smart contracts Solidity (à venir)
└── scripts/              # Scripts de déploiement (à venir)
```

## Installation

```bash
# Cloner le repo
git clone https://github.com/ton-username/passeport-luxe.git
cd passeport-luxe

# Copier le fichier d'environnement
cp .env.example .env
# Remplir les valeurs dans .env

# Tester le générateur SUN
node phygital/nfc/sun_generator.js
```

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Front-end | Next.js · wagmi · viem |
| Invisibilité | ERC-4337 · ZeroDev · Pimlico |
| Smart Contracts | Solidity · Foundry |
| Stockage | IPFS · Pinata · Arweave |
| Phygital | NFC · SUN · Cryptographie ECDSA |
| Testnet | Sepolia · Base Sepolia · Alchemy |

## Règle absolue

> La technologie ne doit jamais être une friction.
> MetaMask est interdit côté client final.
