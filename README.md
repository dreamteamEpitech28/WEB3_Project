# Digital Passport Montre de Luxe

Projet Next.js 14 (App Router) pour un **passeport digital de montre de luxe** avec UI glassmorphism, animations subtiles et intégration prête pour wagmi/viem (Sepolia & Base Sepolia).

## Stack

- Next.js 14.2.0 (App Router)
- TypeScript (strict)
- Tailwind CSS 3.4+
- shadcn-like UI (`button`, `card`, `badge`)
- `wagmi` + `viem` (config testnets)
- `@tanstack/react-query`
- `framer-motion`

## Démarrage

```bash
# Clone with submodules (required for Foundry dependencies)
git clone --recurse-submodules <repo-url>
# Or, if already cloned without submodules:
git submodule update --init --recursive

npm install
npm run dev
```

Puis ouvrir `http://localhost:3000/passport/1` dans le navigateur.

## Pages principales

- `/` : écran d'accès mock (UX login) avec CTA vers le passeport.
- `/passport/[id]` : passeport digital luxe, connecté aux **données mock** (`watch-000001.json`).

## Notes

- Aucune adresse de wallet n'est affichée (connexion invisible).
- wagmi/viem sont déjà configurés pour une intégration contrat **Day 2**.

---

## Smart Contracts — ABI Access (Front-end)

Contracts are in `contract/src/`. Compiled artifacts live in `contract/out/`.

### Rebuild ABIs

```bash
cd contract
~/.foundry/bin/forge build
```

### ABI file locations

| Contract | Standard | Artifact path |
|---|---|---|
| `WatchPassport` | ERC-721 | `contract/out/WatchPassport.sol/WatchPassport.json` |
| `SpareParts` | ERC-1155 | `contract/out/SpareParts.sol/SpareParts.json` |
| `VIPIdentity` | ERC-5192 (Soulbound) | `contract/out/VIPIdentity.sol/VIPIdentity.json` |

Each JSON contains the full artifact. Extract the `abi` array from it.

### Usage with wagmi/viem

```ts
import watchPassportArtifact from '../contract/out/WatchPassport.sol/WatchPassport.json'
import sparePartsArtifact    from '../contract/out/SpareParts.sol/SpareParts.json'
import vipIdentityArtifact   from '../contract/out/VIPIdentity.sol/VIPIdentity.json'

const watchPassportAbi = watchPassportArtifact.abi
const sparePartsAbi    = sparePartsArtifact.abi
const vipIdentityAbi   = vipIdentityArtifact.abi
```

Then use with `useReadContract` / `useWriteContract` (wagmi) or `getContract` (viem) as usual, passing the deployed address (Sepolia) once available.

