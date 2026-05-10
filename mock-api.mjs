import http from 'node:http'
import crypto from 'node:crypto'

const PORT = 4000
const BASE_URL = `http://localhost:${PORT}`

// In-memory store
const users = new Map()
const tokens = new Map()
const seniors = new Map()
const emails = new Map()
const subscriptions = new Map()
const userSeniors = new Map()
const userSubscriptions = new Map()

// Seed demo data
const demoUser = {
  id: crypto.randomUUID(),
  email: 'demo@sentinelle.app',
  password: 'password123',
  prenom: 'Bruno',
  nom: 'Demo',
}

const demoToken = 'stl_demo_token_sentinelle_2024'
users.set(demoUser.email, demoUser)
tokens.set(demoToken, demoUser.id)
userSeniors.set(demoUser.id, [])

const senior1 = {
  id: crypto.randomUUID(),
  userId: demoUser.id,
  prenom: 'Micheline',
  gmail: 'micheline.dupont@gmail.com',
  actif: true,
  seuilAlerte: 60,
  oauthStatus: 'active',
  lastSyncAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}
const senior2 = {
  id: crypto.randomUUID(),
  userId: demoUser.id,
  prenom: 'Roger',
  gmail: 'roger.martin@gmail.com',
  actif: true,
  seuilAlerte: 50,
  oauthStatus: 'pending',
  lastSyncAt: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

seniors.set(senior1.id, senior1)
seniors.set(senior2.id, senior2)
userSeniors.set(demoUser.id, [senior1.id, senior2.id])

const analyses = [
  {
    id: crypto.randomUUID(),
    seniorId: senior1.id,
    fromEmail: 'security@bank-account-verify.com',
    subject: 'URGENT : Votre compte bancaire va être désactivé',
    dateReceived: new Date().toISOString(),
    score: 85,
    categorie: 'phishing',
    niveau: 'danger',
    explication: "Email frauduleux imitant une banque. Le domaine 'bank-account-verify.com' est suspect. L'urgence est une technique d'hameçonnage classique pour éviter la réflexion.",
    conseilEnfant: "Contactez Micheline immédiatement pour la prévenir de ne pas répondre et de ne cliquer sur aucun lien. Signalez l'email comme phishing.",
    indicateurs: ['Domaine suspect', 'Création d\'urgence', 'Fausse adresse bancaire', 'Demande d\'action immédiate'],
    alerteEnvoyee: true,
    alerteEnvoyeeAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    seniorId: senior1.id,
    fromEmail: 'newsletter@amazon.fr',
    subject: 'Vos offres de la semaine',
    dateReceived: new Date(Date.now() - 3600000).toISOString(),
    score: 5,
    categorie: 'newsletter',
    niveau: 'safe',
    explication: "Newsletter commerciale légitime de la part d'Amazon France. Aucun élément suspect détecté.",
    conseilEnfant: 'Aucune action nécessaire. Cet email est sûr.',
    indicateurs: [],
    alerteEnvoyee: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: crypto.randomUUID(),
    seniorId: senior2.id,
    fromEmail: 'dhl-support@track-dhl.top',
    subject: 'Votre colis est en attente de livraison',
    dateReceived: new Date(Date.now() - 7200000).toISOString(),
    score: 65,
    categorie: 'hameçonnage compte',
    niveau: 'danger',
    explication: "Faux email DHL avec un domaine suspect. Le lien de suivi mène probablement à un site de phishing.",
    conseilEnfant: "Prévenez Roger qu'il ne s'agit pas d'un vrai email DHL. Ne pas cliquer sur le lien de suivi.",
    indicateurs: ['Domaine suspect', 'Usurpation DHL', 'Lien de tracking frauduleux'],
    alerteEnvoyee: true,
    alerteEnvoyeeAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: crypto.randomUUID(),
    seniorId: senior1.id,
    fromEmail: 'maman@free.fr',
    subject: 'Bonjour mon fils,',
    dateReceived: new Date(Date.now() - 86400000).toISOString(),
    score: 0,
    categorie: 'personnel',
    niveau: 'safe',
    explication: "Email personnel de la part d'un proche. Aucun risque détecté.",
    conseilEnfant: "Aucune action nécessaire. Email personnel légitime.",
    indicateurs: [],
    alerteEnvoyee: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
]

for (const a of analyses) {
  emails.set(a.id, a)
}

const sub = {
  id: crypto.randomUUID(),
  userId: demoUser.id,
  status: 'active',
  plan: 'solo',
  currentPeriodEnd: new Date(Date.now() + 30 * 86400000).toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}
subscriptions.set(sub.id, sub)
userSubscriptions.set(demoUser.id, sub.id)

function parseCookies(req) {
  const cookie = req.headers.cookie || ''
  return Object.fromEntries(cookie.split(';').map(c => c.trim().split('=').map(decodeURIComponent)))
}

function json(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': '*', 'Access-Control-Allow-Headers': '*' })
  res.end(JSON.stringify(data))
}

function getToken(req) {
  const auth = req.headers.authorization || ''
  return auth.replace('Bearer ', '')
}

function authenticate(req) {
  const token = getToken(req)
  const userId = tokens.get(token)
  if (!userId) return null
  return { userId, user: [...users.values()].find(u => u.id === userId) }
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', () => {
      try { resolve(JSON.parse(body)) }
      catch { resolve({}) }
    })
  })
}

function getSeniorsWithAnalyses(userId) {
  const seniorIds = userSeniors.get(userId) || []
  return seniorIds.map(id => {
    const s = seniors.get(id)
    if (!s) return null
    const sEmails = [...emails.values()].filter(e => e.seniorId === id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
    return { ...s, emailAnalyses: sEmails }
  }).filter(Boolean)
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, BASE_URL)
  const method = req.method
  const path = url.pathname

  // CORS
  if (method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': '*', 'Access-Control-Allow-Headers': '*' })
    return res.end()
  }

  // Health
  if (path === '/' && method === 'GET') {
    return json(res, 200, { name: 'Sentinelle API', version: '0.1.0' })
  }

  // Auth Register
  if (path === '/api/auth/register' && method === 'POST') {
    const body = await parseBody(req)
    if (users.has(body.email)) return json(res, 409, { error: 'Cet email est déjà utilisé' })
    const user = { id: crypto.randomUUID(), email: body.email, password: body.password, prenom: body.prenom || null, nom: body.nom || null }
    users.set(user.email, user)
    const token = 'stl_' + crypto.randomUUID().replace(/-/g, '')
    tokens.set(token, user.id)
    userSeniors.set(user.id, [])
    return json(res, 201, { user: { id: user.id, email: user.email, prenom: user.prenom, nom: user.nom }, token })
  }

  // Auth Login
  if (path === '/api/auth/login' && method === 'POST') {
    const body = await parseBody(req)
    const user = users.get(body.email)
    if (!user || user.password !== body.password) return json(res, 401, { error: 'Email ou mot de passe incorrect' })
    const token = 'stl_' + crypto.randomUUID().replace(/-/g, '')
    tokens.set(token, user.id)
    return json(res, 200, { user: { id: user.id, email: user.email, prenom: user.prenom, nom: user.nom }, token })
  }

  // Auth Me
  if (path === '/api/auth/me' && method === 'GET') {
    const auth = authenticate(req)
    if (!auth) return json(res, 401, { error: 'Non authentifié' })
    return json(res, 200, { id: auth.user.id, email: auth.user.email, prenom: auth.user.prenom, nom: auth.user.nom })
  }

  // Auth Logout
  if (path === '/api/auth/logout' && method === 'POST') {
    const token = getToken(req)
    tokens.delete(token)
    return json(res, 200, { message: 'Déconnecté' })
  }

  // Seniors List
  if (path === '/api/seniors' && method === 'GET') {
    const auth = authenticate(req)
    if (!auth) return json(res, 401, { error: 'Non authentifié' })
    const seniorList = getSeniorsWithAnalyses(auth.userId)
    return json(res, 200, { seniors: seniorList })
  }

  // Create Senior
  if (path === '/api/seniors' && method === 'POST') {
    const auth = authenticate(req)
    if (!auth) return json(res, 401, { error: 'Non authentifié' })
    const body = await parseBody(req)
    const existing = [...seniors.values()].find(s => s.userId === auth.userId && s.gmail === body.gmail)
    if (existing) return json(res, 409, { error: 'Ce senior est déjà suivi' })
    const senior = {
      id: crypto.randomUUID(), userId: auth.userId, prenom: body.prenom, gmail: body.gmail,
      actif: true, seuilAlerte: 60, oauthStatus: 'pending', lastSyncAt: null,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    }
    seniors.set(senior.id, senior)
    const list = userSeniors.get(auth.userId) || []
    list.push(senior.id)
    userSeniors.set(auth.userId, list)
    return json(res, 201, { senior, oauthUrl: `http://localhost:4000/mock-oauth?seniorId=${senior.id}` })
  }

  // Show Senior
  if (path.match(/^\/api\/seniors\/([^/]+)$/) && method === 'GET') {
    const auth = authenticate(req)
    if (!auth) return json(res, 401, { error: 'Non authentifié' })
    const id = path.split('/')[3]
    const senior = seniors.get(id)
    if (!senior || senior.userId !== auth.userId) return json(res, 404, { error: 'Senior introuvable' })
    const sEmails = [...emails.values()].filter(e => e.seniorId === id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 20)
    return json(res, 200, { senior: { ...senior, emailAnalyses: sEmails } })
  }

  // Update Senior
  if (path.match(/^\/api\/seniors\/([^/]+)$/) && method === 'PATCH') {
    const auth = authenticate(req)
    if (!auth) return json(res, 401, { error: 'Non authentifié' })
    const id = path.split('/')[3]
    const senior = seniors.get(id)
    if (!senior || senior.userId !== auth.userId) return json(res, 404, { error: 'Senior introuvable' })
    const body = await parseBody(req)
    Object.assign(senior, body)
    senior.updatedAt = new Date().toISOString()
    return json(res, 200, { senior })
  }

  // Delete Senior
  if (path.match(/^\/api\/seniors\/([^/]+)$/) && method === 'DELETE') {
    const auth = authenticate(req)
    if (!auth) return json(res, 401, { error: 'Non authentifié' })
    const id = path.split('/')[3]
    const senior = seniors.get(id)
    if (!senior || senior.userId !== auth.userId) return json(res, 404, { error: 'Senior introuvable' })
    seniors.delete(id)
    const list = userSeniors.get(auth.userId) || []
    userSeniors.set(auth.userId, list.filter(s => s !== id))
    return json(res, 200, { message: 'Senior supprimé' })
  }

  // Senior OAuth URL
  if (path.match(/^\/api\/seniors\/([^/]+)\/oauth$/) && method === 'GET') {
    return json(res, 200, { oauthUrl: `http://localhost:4000/mock-oauth?seniorId=${path.split('/')[3]}` })
  }

  // Emails List
  if (path === '/api/emails' && method === 'GET') {
    const auth = authenticate(req)
    if (!auth) return json(res, 401, { error: 'Non authentifié' })
    const seniorIds = userSeniors.get(auth.userId) || []
    const userEmails = [...emails.values()].filter(e => seniorIds.includes(e.seniorId))
    userEmails.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    const enriched = userEmails.map(e => ({ ...e, senior: { prenom: seniors.get(e.seniorId)?.prenom, gmail: seniors.get(e.seniorId)?.gmail } }))
    return json(res, 200, { analyses: enriched })
  }

  // Email Detail
  if (path.match(/^\/api\/emails\/([^/]+)$/) && method === 'GET') {
    const auth = authenticate(req)
    if (!auth) return json(res, 401, { error: 'Non authentifié' })
    const id = path.split('/')[3]
    const analysis = emails.get(id)
    if (!analysis) return json(res, 404, { error: 'Analyse introuvable' })
    return json(res, 200, { analysis })
  }

  // Emails by Senior
  if (path.match(/^\/api\/seniors\/([^/]+)\/emails$/) && method === 'GET') {
    const auth = authenticate(req)
    if (!auth) return json(res, 401, { error: 'Non authentifié' })
    const seniorId = path.split('/')[3]
    const senior = seniors.get(seniorId)
    if (!senior || senior.userId !== auth.userId) return json(res, 404, { error: 'Senior introuvable' })
    const sEmails = [...emails.values()].filter(e => e.seniorId === seniorId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return json(res, 200, { analyses: sEmails })
  }

  // Gmail Authorize
  if (path.match(/^\/api\/gmail\/authorize\/([^/]+)$/) && method === 'GET') {
    return json(res, 200, { authUrl: `http://localhost:4000/mock-oauth?seniorId=${path.split('/')[4]}` })
  }

  // Gmail Sync
  if (path.match(/^\/api\/gmail\/sync\/([^/]+)$/) && method === 'POST') {
    const auth = authenticate(req)
    if (!auth) return json(res, 401, { error: 'Non authentifié' })
    const seniorId = path.split('/')[4]
    const senior = seniors.get(seniorId)
    if (!senior) return json(res, 404, { error: 'Senior introuvable' })
    senior.lastSyncAt = new Date().toISOString()
    // Generate a mock analysis
    const newEmail = {
      id: crypto.randomUUID(), seniorId, fromEmail: 'arnaque@fake-promo.xyz', subject: 'GAGNANT : Vous avez gagné un iPhone 16 !',
      dateReceived: new Date().toISOString(), score: 75, categorie: 'arnaque financière', niveau: 'danger',
      explication: "Faux concours avec un domaine suspect. Ce type d'arnaque vise à récupérer des informations personnelles.",
      conseilEnfant: "Prévenez le senior qu'il s'agit d'une arnaque classique. Ne pas répondre ni cliquer.",
      indicateurs: ['Domaine suspect', 'Concours frauduleux', 'Demande coordonnées bancaires'], alerteEnvoyee: true,
      alerteEnvoyeeAt: new Date().toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    }
    emails.set(newEmail.id, newEmail)
    return json(res, 200, { analyses: [newEmail] })
  }

  // Gmail Revoke
  if (path.match(/^\/api\/gmail\/revoke\/([^/]+)$/) && method === 'POST') {
    const auth = authenticate(req)
    if (!auth) return json(res, 401, { error: 'Non authentifié' })
    const seniorId = path.split('/')[4]
    const senior = seniors.get(seniorId)
    if (senior) { senior.oauthStatus = 'revoked' }
    return json(res, 200, { message: 'Accès Gmail révoqué' })
  }

  // Subscription
  if (path === '/api/subscription' && method === 'GET') {
    const auth = authenticate(req)
    if (!auth) return json(res, 401, { error: 'Non authentifié' })
    const subId = userSubscriptions.get(auth.userId)
    const subscription = subId ? subscriptions.get(subId) : { id: crypto.randomUUID(), userId: auth.userId, status: 'inactive', plan: 'solo', currentPeriodEnd: null }
    if (!subId) {
      subscriptions.set(subscription.id, subscription)
      userSubscriptions.set(auth.userId, subscription.id)
    }
    return json(res, 200, { subscription })
  }

  // Subscription Checkout
  if (path === '/api/subscription/checkout' && method === 'POST') {
    const auth = authenticate(req)
    if (!auth) return json(res, 401, { error: 'Non authentifié' })
    const subId = userSubscriptions.get(auth.userId)
    let subscription = subId ? subscriptions.get(subId) : null
    if (!subscription) {
      subscription = { id: crypto.randomUUID(), userId: auth.userId, status: 'active', plan: 'solo', currentPeriodEnd: new Date(Date.now() + 30 * 86400000).toISOString() }
      subscriptions.set(subscription.id, subscription)
      userSubscriptions.set(auth.userId, subscription.id)
    } else {
      subscription.status = 'active'
      subscription.currentPeriodEnd = new Date(Date.now() + 30 * 86400000).toISOString()
    }
    return json(res, 200, { subscription, checkoutUrl: null })
  }

  // Subscription Pause
  if (path === '/api/subscription/pause' && method === 'POST') {
    const auth = authenticate(req)
    if (!auth) return json(res, 401, { error: 'Non authentifié' })
    const subId = userSubscriptions.get(auth.userId)
    const subscription = subId ? subscriptions.get(subId) : null
    if (subscription) subscription.status = 'paused'
    return json(res, 200, { subscription })
  }

  // Subscription Cancel
  if (path === '/api/subscription/cancel' && method === 'POST') {
    const auth = authenticate(req)
    if (!auth) return json(res, 401, { error: 'Non authentifié' })
    const subId = userSubscriptions.get(auth.userId)
    const subscription = subId ? subscriptions.get(subId) : null
    if (subscription) subscription.status = 'cancelled'
    return json(res, 200, { subscription })
  }

  // Mock OAuth callback page
  if (path === '/mock-oauth' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(`
      <!DOCTYPE html>
      <html><head><meta charset="utf-8"><title>Autorisation Gmail</title>
      <style>body{font-family:sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#f8fafc}
      .card{background:white;padding:2rem;border-radius:1rem;box-shadow:0 20px 60px rgba(0,0,0,.08);text-align:center;max-width:400px}
      h1{color:#0f172a}button{padding:1rem 1.5rem;background:#0f172a;color:white;border:none;border-radius:.75rem;cursor:pointer;font-size:1rem}
      .note{color:#64748b;font-size:.85rem;margin-top:1rem}
      </style></head><body>
      <div class="card">
        <h1>Autorisation Gmail</h1>
        <p>Le senior autorise Sentinelle à analyser ses emails en lecture seule.</p>
        <button onclick="document.querySelector('.card').innerHTML='<h1>✅ Autorisation confirmée</h1><p>Vous pouvez fermer cette fenêtre.</p>'">
          Autoriser l'accès Gmail
        </button>
        <p class="note">Scope : gmail.readonly — Lecture seule, pas d'envoi ni de modification</p>
      </div></body></html>
    `)
    return
  }

  // Mock OAuth callback for the API
  if (path === '/api/gmail/callback' && method === 'GET') {
    const seniorId = url.searchParams.get('state')
    if (seniorId && seniors.has(seniorId)) {
      const senior = seniors.get(seniorId)
      senior.oauthStatus = 'active'
    }
    res.writeHead(302, { Location: 'http://localhost:3000/confirmation' })
    return res.end()
  }

  // Stripe Webhook (mock)
  if (path === '/api/stripe/webhook') {
    return json(res, 200, { received: true })
  }

  // 404
  json(res, 404, { error: `Not found: ${method} ${path}` })
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  🛡️  Sentinelle Mock API démarrée sur http://localhost:${PORT}`)
  console.log(`  📧 Compte demo : demo@sentinelle.app / password123\n`)
})
