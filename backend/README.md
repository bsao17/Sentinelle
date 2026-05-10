# API Sentinelle

Backend AdonisJS pour l'application Sentinelle — Protection des seniors contre les arnaques numériques.

## Stack

- **Framework** : AdonisJS 6
- **Base de données** : PostgreSQL 16
- **ORM** : Lucid (AdonisJS)
- **Auth** : JWT (Access Tokens)
- **IA** : Claude API (Anthropic)
- **Paiement** : Stripe
- **Email** : Resend
- **OAuth** : Google Gmail API

## Prérequis

- Node.js 22+
- PostgreSQL 16+

## Installation

```bash
cd backend
npm install
```

## Configuration

Copier `.env.example` vers `.env` et configurer :

```bash
cp .env.example .env
```

Variables requises pour le développement :
- `DB_*` : connexion PostgreSQL
- `APP_KEY` : générer avec `node ace generate:key`

## Lancer

```bash
# Migrations
node ace migration:run

# Seed (données de démo)
node ace db:seed

# Serveur de dev
node ace serve --watch
```

## API Endpoints

### Auth
- `POST /api/auth/register` — Créer un compte
- `POST /api/auth/login` — Se connecter
- `GET /api/auth/me` — Profil (auth requis)
- `POST /api/auth/logout` — Déconnexion (auth requis)

### Seniors
- `GET /api/seniors` — Lister les seniors
- `POST /api/seniors` — Ajouter un senior
- `GET /api/seniors/:id` — Détail d'un senior
- `PATCH /api/seniors/:id` — Modifier un senior
- `DELETE /api/seniors/:id` — Supprimer un senior
- `GET /api/seniors/:id/oauth` — Obtenir le lien OAuth

### Emails
- `GET /api/emails` — Lister les analyses
- `GET /api/emails/:id` — Détail d'une analyse
- `GET /api/seniors/:seniorId/emails` — Analyses d'un senior

### Gmail OAuth
- `GET /api/gmail/authorize/:seniorId` — Lancer le flow OAuth
- `GET /api/gmail/callback` — Callback OAuth
- `POST /api/gmail/sync/:seniorId` — Synchroniser les emails
- `POST /api/gmail/revoke/:seniorId` — Révoquer l'accès

### Abonnement
- `GET /api/subscription` — Voir l'abonnement
- `POST /api/subscription/checkout` — Créer une session Stripe
- `POST /api/subscription/cancel` — Résilier
- `POST /api/subscription/pause` — Mettre en pause

### Stripe
- `POST /api/stripe/webhook` — Webhook Stripe
