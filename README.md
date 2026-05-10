# Sentinelle

Application full-stack de protection des seniors contre les arnaques numériques.

**Frontend** : Nuxt 3 + TypeScript  
**Backend** : AdonisJS 6 + PostgreSQL  
**IA** : Claude API (Anthropic)  
**Paiement** : Stripe  
**Email** : Resend  
**OAuth** : Google Gmail API

## Structure

```
Sentinelle/
├── backend/              # API AdonisJS
│   ├── app/
│   │   ├── Controllers/  # Auth, Seniors, Emails, Subscription, Gmail
│   │   ├── Models/       # User, Senior, EmailAnalysis, Subscription
│   │   ├── Services/     # Gmail, Claude, Stripe, Email
│   │   ├── Middleware/   # Auth middleware
│   │   └── Validators/  # VineJS validators
│   ├── config/           # App, DB, Auth, CORS, Mail, Stripe, Drive
│   ├── database/
│   │   ├── migrations/   # 5 tables
│   │   └── seeders/      # Données de démo
│   ├── start/            # Routes, Kernel
│   └── tests/            # Tests backend (Japa)
├── components/           # Composants Vue (AuthFormLayout, DashboardNav)
├── composables/          # État + API client (useAuth, useSenior, etc.)
├── layouts/              # Layout principal avec navigation
├── middleware/            # Middleware Nuxt (auth)
├── pages/                # Pages publiques + dashboard
├── docker-compose.yml    # Postgres + API + Frontend
├── mock-api.mjs           # Serveur mock (sans dépendances)
└── nuxt.config.ts
```

## Démarrage rapide

### 1. Base de données

```bash
docker compose up -d postgres
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env   # configurer les clés
node ace migration:run
node ace db:seed
node ace serve --watch  # → http://localhost:4000
```

### 3. Frontend

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 3000  # → http://localhost:3000
```

### 4. Mock API (sans PostgreSQL, développement rapide)

```bash
# Terminal 1 - API mock (stockage mémoire, données de démo pré-chargées)
node mock-api.mjs
# → http://localhost:4000

# Terminal 2 - Frontend
npm run dev -- --host 0.0.0.0 --port 3000
# → http://localhost:3000
```

Le mock API simule tous les endpoints (auth, seniors, emails, abonnement, OAuth Gmail) sans base de données ni clés API tierces. Les données sont réinitialisées à chaque redémarrage.

### 5. Tout en un (Docker)

```bash
docker compose up --build
```

## Fonctionnalités

- Inscription / Connexion avec JWT
- Ajout de seniors avec envoi de lien OAuth Gmail
- Synchronisation et analyse des emails Gmail (via Claude API)
- Score de risque et catégorisation des emails
- Alertes email en temps réel (via Resend)
- Seuils d'alerte configurables par senior
- Abonnement Stripe (9,90 €/mois)
- Dashboard complet avec historique des analyses
- Sécurité : chiffrement AES-256 des tokens OAuth, scope read-only

## Compte de démo

```bash
email:    demo@sentinelle.app
password: password123
```

## Prérequis

- Node.js 22+
- PostgreSQL 16+ (ou Docker)
- Clés API : Google OAuth, Claude, Stripe, Resend
