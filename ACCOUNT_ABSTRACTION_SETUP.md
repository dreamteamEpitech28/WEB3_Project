# Configuration Account Abstraction (ERC-4337) avec ZeroDev

Ce guide explique comment configurer l'infrastructure Account Abstraction pour rendre l'expérience utilisateur **magique, furtive et infaillible**.

## 🎯 Objectifs

- ✅ Zéro MetaMask imposé au client
- ✅ Zéro seed phrase affichée
- ✅ Transactions gasless (payées par la marque)
- ✅ Expérience invisible et fluide

## 📋 Prérequis

1. Un compte **ZeroDev** : https://dashboard.zerodev.app
2. Un compte **Alchemy** : https://dashboard.alchemy.com
3. Un projet Next.js configuré (déjà fait ✅)

## 🔧 Configuration Étape par Étape

### 1. Créer un projet ZeroDev

1. Allez sur https://dashboard.zerodev.app
2. Créez un nouveau projet
3. Sélectionnez **Base Sepolia** comme réseau
4. Copiez votre **Project ID** (ex: `abc123-def456-...`)

### 2. Configurer Alchemy RPC

1. Allez sur https://dashboard.alchemy.com
2. Créez une nouvelle application
3. Sélectionnez **Base Sepolia** comme réseau
4. Copiez votre **API Key** (ex: `https://base-sepolia.g.alchemy.com/v2/YOUR_API_KEY`)

### 3. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec :

```env
# ZeroDev Configuration
NEXT_PUBLIC_ZERODEV_PROJECT_ID=votre-project-id-ici

# Alchemy RPC (Base Sepolia)
NEXT_PUBLIC_ALCHEMY_BASE_SEPOLIA_RPC_URL=https://base-sepolia.g.alchemy.com/v2/votre-api-key

# Paymaster Sponsor (activé par défaut avec ZeroDev)
NEXT_PUBLIC_ZERODEV_PAYMASTER_ENABLED=true
```

### 4. Activer le Paymaster Sponsorisé

ZeroDev fournit un **paymaster de test** gratuit pour le développement. Pour la production :

1. Dans le dashboard ZeroDev, allez dans **Paymaster**
2. Configurez votre paymaster sponsorisé
3. Déposez des fonds pour payer les frais de gas des utilisateurs
4. Activez le paymaster pour votre projet

## 🚀 Utilisation dans le Code

### Initialisation Automatique

Le Smart Account s'initialise automatiquement au chargement de l'application via le composant `AAInitializer` dans `Providers.tsx`.

### Utiliser le Smart Account

```tsx
import { useSmartAccount } from "@/components/AAInitializer";
import { useContractActions } from "@/lib/contractHelpers";

function MyComponent() {
  const { smartAccount, isReady } = useSmartAccount();
  const { createWatchPassport, grantVipStatus } = useContractActions();

  if (!isReady) {
    return <div>Chargement...</div>;
  }

  const handleCreatePassport = async () => {
    // Transaction gasless automatique !
    await createWatchPassport(
      "0x...", // Adresse du contrat WatchPassport
      smartAccount.address,
      BigInt(12345) // Numéro de série
    );
  };

  return <button onClick={handleCreatePassport}>Créer passeport</button>;
}
```

## 🔐 Sécurité

### Stockage de la Clé Privée

- La clé privée est stockée dans `localStorage` (côté client)
- **Jamais affichée** à l'utilisateur
- **Jamais envoyée** au serveur
- Générée automatiquement à la première visite

### Social Recovery

En cas de compromission (crise "Hacking VIP"), le module `socialRecovery.ts` permet :
- Vérification d'identité off-chain par la marque
- Création d'un nouveau Smart Account
- Migration des droits VIP vers le nouveau compte

## 📝 Notes Importantes

### Pour le Pitch (Zéro Jargon Technique)

❌ **NE PAS DIRE** :
- "J'ai configuré le Paymaster ERC-4337"
- "Le Smart Account utilise un bundler pour les UserOperations"
- "L'ECDSA validator signe les transactions"

✅ **DIRE PLUTÔT** :
- "Nous avons fait en sorte que la marque offre les frais de certification à ses clients pour une expérience fluide"
- "Le système crée automatiquement un compte sécurisé pour chaque client sans qu'il ait besoin de gérer quoi que ce soit"
- "En cas de problème, le client peut récupérer son accès en contactant la marque, sans seed phrase"

## 🐛 Dépannage

### Erreur "NEXT_PUBLIC_ZERODEV_PROJECT_ID manquant"

➡️ Vérifiez que votre fichier `.env.local` existe et contient la variable.

### Erreur de connexion Alchemy

➡️ Vérifiez que votre URL RPC est correcte et que votre projet Alchemy est actif.

### Transactions qui échouent

➡️ Vérifiez que le Paymaster est bien activé dans le dashboard ZeroDev et qu'il a des fonds.

## 📚 Ressources

- [Documentation ZeroDev](https://docs.zerodev.app)
- [ERC-4337 Specification](https://eips.ethereum.org/EIPS/eip-4337)
- [Alchemy Base Sepolia](https://docs.alchemy.com/docs/base-sepolia)
