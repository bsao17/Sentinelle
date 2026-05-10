import env from '#contracts/env'

export interface AnalysisResult {
  score: number
  categorie: string
  niveau: 'safe' | 'suspect' | 'danger'
  explication: string
  conseilEnfant: string
  indicateurs: string[]
}

export default class ClaudeService {
  private apiKey: string
  private model: string
  private baseUrl = 'https://api.anthropic.com/v1'

  constructor() {
    this.apiKey = env.CLAUDE_API_KEY || ''
    this.model = env.CLAUDE_MODEL || 'claude-sonnet-4-20250514'
  }

  async analyzeEmail(from: string, subject: string, snippet: string): Promise<AnalysisResult> {
    if (!this.apiKey) {
      return this.mockAnalysis(from, subject, snippet)
    }

    const prompt = `Tu es un expert en cybersécurité spécialisé dans la détection d'arnaques par email.

Analyse cet email et retourne UNIQUEMENT un objet JSON (sans balises, sans markdown) avec les champs suivants :
- score: nombre de 0 à 100 (0 = totalement sûr, 100 = arnaque certaine)
- categorie: "phishing", "arnaque financière", "hameçonnage compte", "faux support", "spam", "légitime", "newsletter", "personnel"
- niveau: "safe", "suspect", "danger"
- explication: explication concise en français (2-3 phrases)
- conseilEnfant: conseil à donner à l'enfant aidant en français
- indicateurs: liste des signaux d'alerte détectés (max 5)

Email reçu de: ${from}
Objet: ${subject}
Contenu: ${snippet.slice(0, 2000)}`

    const response = await fetch(`${this.baseUrl}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Claude API error:', error)
      return this.mockAnalysis(from, subject, snippet)
    }

    const data = await response.json()
    const content = data.content?.[0]?.text || '{}'

    try {
      const cleaned = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()
      return JSON.parse(cleaned) as AnalysisResult
    } catch {
      return this.mockAnalysis(from, subject, snippet)
    }
  }

  private mockAnalysis(from: string, subject: string, _snippet: string): AnalysisResult {
    const lowerSubject = subject.toLowerCase()
    const lowerFrom = from.toLowerCase()
    let score = 10
    const indicateurs: string[] = []

    const dangerKeywords = ['urgent', 'compte bloqué', 'mot de passe', 'confirmer', 'gagner', 'lottery', 'prize', 'bank', 'sécurité', 'vérification', 'suspendu', 'désactivé']
    const dangerDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com']

    for (const keyword of dangerKeywords) {
      if (lowerSubject.includes(keyword)) {
        score += 15
        indicateurs.push(`Mot-clé suspect: "${keyword}"`)
      }
    }

    if (lowerFrom.includes('@')) {
      const domain = lowerFrom.split('@')[1]
      if (domain && dangerDomains.includes(domain) && !lowerFrom.includes('@' + domain + '.')) {
        // Check if it's a personal domain, not the actual big provider
        if (domain.split('.').length > 2) {
          score += 20
          indicateurs.push(`Domaine suspect: ${domain}`)
        }
      }
    }

    score = Math.min(100, Math.max(0, score))

    let categorie: string
    let niveau: 'safe' | 'suspect' | 'danger'
    let explication: string
    let conseilEnfant: string

    if (score >= 60) {
      categorie = 'phishing'
      niveau = 'danger'
      explication = "Cet email présente de multiples signaux d'alerte caractéristiques d'une tentative de hameçonnage."
      conseilEnfant = "Contactez immédiatement le senior pour l'informer de ne pas répondre et de ne cliquer sur aucun lien."
    } else if (score >= 30) {
      categorie = 'suspect'
      niveau = 'suspect'
      explication = "Certains éléments de cet email sont inhabituels. Une vigilance accrue est recommandée."
      conseilEnfant = "Demandez au senior de vous transférer l'email pour vérification avant toute action."
    } else {
      categorie = 'légitime'
      niveau = 'safe'
      explication = "Cet email semble légitime et ne présente pas de signaux d'alerte significatifs."
      conseilEnfant = "Aucune action nécessaire. L'email semble sûr."
    }

    return { score, categorie, niveau, explication, conseilEnfant, indicateurs }
  }
}
