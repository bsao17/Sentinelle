# Sentinelle

Application Nuxt 3 pour aider les seniors à se protéger contre les arnaques numériques.

## Fonctionnalités
- Page d’accueil et parcours d’inscription/connexion
- Tableau de bord utilisateur
- Gestion des seniors et des contacts
- Consultation des e-mails suspects
- Protection de Gmail et conseils de sécurité
- Gestion d’abonnement et paramètres utilisateur

## Installation
```bash
cd /home/bruno/Documents/Sentinelle
npm install
```

## Exécution
```bash
npm run dev -- --host 0.0.0.0 --port 3000
```

Puis ouvrir `http://localhost:3000`

## Prérequis
- Node.js 22+

## Structure
- `pages/` : pages utilisateur
- `components/` : composants de l’interface
- `composables/` : logique d’état et données simulées
- `layouts/default.vue` : mise en page globale

## Objectif
Offrir une interface simple pour superviser la sécurité des seniors face aux escroqueries en ligne et centraliser les actions de protection depuis une application web.
