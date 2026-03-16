# Règles de contribution – WEB3 Project

L’objectif est **d’interdire tout push direct sur `main`** et de passer **obligatoirement par des Pull Requests**.

## Branches

- **`main`** : branche protégée, toujours déployable.
- **Branches de travail** : crée une branche par feature ou fix, par exemple :
  - `feat/luxury-nfc-improvements`
  - `fix/passport-1-layout`

```bash
git checkout -b feat/ma-feature
# dev...
git commit -m "feat: ma feature"
git push -u origin feat/ma-feature
```

## Pull Requests obligatoires

1. Ouvrir une PR depuis ta branche vers `main`.
2. Attendre le passage du CI (GitHub Actions).
3. Obtenir au moins **1 review** approuvée avant merge.
4. **Interdiction** de `git push` directement sur `main`.

## Checklist avant d’ouvrir une PR

- `npm run lint` passe sans erreur.
- `npm run build` passe (build Next.js OK).
- La page `/passport/1` fonctionne et reste **sans adresse de wallet visible**.

## À configurer dans GitHub (à faire une fois)

Dans les settings du repo GitHub (`Settings` → `Branches` → `Branch protection rules`) :

- Créer une règle pour la branche **`main`** :
  - ✅ Require a pull request before merging
  - ✅ Require status checks to pass before merging
  - ✅ Require conversations to be resolved before merging (optionnel mais recommandé)
  - ⛔ **Décoche** l’option qui autorise le push direct (ne pas bypasser les protections).

