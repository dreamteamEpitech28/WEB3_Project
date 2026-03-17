## Checklist Sécurité – Engineering Invisible Luxury

Cette checklist résume les points de sécurité vérifiés sur les contrats du projet (Foundry).

### Contrats et patterns

- [x] **Pas de `tx.origin`** utilisé dans le code des contrats.
- [x] **OpenZeppelin** utilisé pour les bases sécurisées :
  - `Ownable` pour le contrôle d’accès propriétaire.
  - `ERC721` pour `WatchPassport`.
  - `ERC1155` pour `SpareParts`.
- [x] **Aucun appel externe avant mise à jour de l’état** dans les fonctions critiques (pas de pattern de réentrance évident).

### Contrôle d’accès / mint

- [x] Fonctions de **mint** (montre, pièces, VIP soulbound) restreintes à `onlyOwner`.
- [x] Tests Foundry vérifiant que **les comptes non-owner ne peuvent pas minter** ni transférer là où c’est interdit (soulbound, batch mint, etc.).

### Tests Foundry ciblés

- [x] `VIPIdentity.t.sol` :
  - Tests de non-transférabilité (soulbound).
  - Vérification de l’interface ERC‑5192.
  - `onlyOwner` sur les fonctions de mint.
- [x] `SpareParts.t.sol` :
  - `onlyOwner` sur `mintBatch`.
  - Validation du mint de pièces uniques et par lot.
- [x] `WatchPassport.t.sol` :
  - Vérification du propriétaire du contrat.
  - Mint contrôlé des passeports de montre.

Ces éléments couvrent la sécurité “de base” attendue dans le barème : pas de patterns dangereux évidents, utilisation d’OpenZeppelin, et comportements sensibles protégés par des tests Foundry.

