import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#app/Controllers/AuthController')
const SeniorsController = () => import('#app/Controllers/SeniorsController')
const EmailsController = () => import('#app/Controllers/EmailsController')
const SubscriptionController = () => import('#app/Controllers/SubscriptionController')
const GmailController = () => import('#app/Controllers/GmailController')

router.get('/', async () => {
  return { name: 'Sentinelle API', version: '0.1.0' }
})

// Auth
router.post('/api/auth/register', [AuthController, 'register'])
router.post('/api/auth/login', [AuthController, 'login'])
router.get('/api/auth/me', [AuthController, 'me']).use(middleware.auth())
router.post('/api/auth/logout', [AuthController, 'logout']).use(middleware.auth())

// Seniors
router.get('/api/seniors', [SeniorsController, 'index']).use(middleware.auth())
router.post('/api/seniors', [SeniorsController, 'store']).use(middleware.auth())
router.get('/api/seniors/:id', [SeniorsController, 'show']).use(middleware.auth())
router.patch('/api/seniors/:id', [SeniorsController, 'update']).use(middleware.auth())
router.delete('/api/seniors/:id', [SeniorsController, 'destroy']).use(middleware.auth())
router.get('/api/seniors/:id/oauth', [SeniorsController, 'getOAuthUrl']).use(middleware.auth())

// Emails
router.get('/api/emails', [EmailsController, 'index']).use(middleware.auth())
router.get('/api/emails/:id', [EmailsController, 'show']).use(middleware.auth())
router.get('/api/seniors/:seniorId/emails', [EmailsController, 'bySenior']).use(middleware.auth())

// Gmail OAuth
router.get('/api/gmail/authorize/:seniorId', [GmailController, 'authorize']).use(middleware.auth())
router.get('/api/gmail/callback', [GmailController, 'callback'])
router.post('/api/gmail/sync/:seniorId', [GmailController, 'sync']).use(middleware.auth())
router.post('/api/gmail/revoke/:seniorId', [GmailController, 'revoke']).use(middleware.auth())

// Subscription
router.get('/api/subscription', [SubscriptionController, 'show']).use(middleware.auth())
router.post('/api/subscription/checkout', [SubscriptionController, 'createCheckout']).use(middleware.auth())
router.post('/api/subscription/cancel', [SubscriptionController, 'cancel']).use(middleware.auth())
router.post('/api/subscription/pause', [SubscriptionController, 'pause']).use(middleware.auth())

// Stripe Webhook
router.post('/api/stripe/webhook', [SubscriptionController, 'webhook'])
