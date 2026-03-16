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
cd my-watch-passport
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

