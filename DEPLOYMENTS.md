# Preuve de déploiement — Testnet

Remplis ce fichier **après** déploiement, en copiant/collant les adresses affichées par Foundry.

## Base Sepolia (chainId 84532)

- WATCH_PASSPORT_BASE_SEPOLIA =
- SPARE_PARTS_BASE_SEPOLIA =
- VIP_IDENTITY_BASE_SEPOLIA =

## Commandes (Foundry)

Depuis la racine du repo :

```bash
cd contract
forge build

# Déploiement
RPC_URL="https://base-sepolia.g.alchemy.com/v2/TON_ALCHEMY_KEY"
PRIVATE_KEY="TON_PRIVATE_KEY_HEX_SANS_0x"

forge script script/Deploy.s.sol:DeployScript \
  --rpc-url "$RPC_URL" \
  --private-key "$PRIVATE_KEY" \
  --broadcast
```

## Notes

- Ne commit **jamais** ton `PRIVATE_KEY`.
- Si tu veux prouver au jury, ajoute une capture d’écran du log Foundry montrant les 3 adresses.

