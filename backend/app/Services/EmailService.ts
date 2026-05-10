import env from '#contracts/env'
import Senior from '#app/Models/Senior'
import EmailAnalysis from '#app/Models/EmailAnalysis'

export default class EmailService {
  private apiKey: string
  private baseUrl = 'https://api.resend.com'

  constructor() {
    this.apiKey = env.RESEND_API_KEY || ''
  }

  async sendAlert(senior: Senior, analysis: EmailAnalysis, userEmail: string): Promise<void> {
    if (!this.apiKey) {
      console.log(`[EMAIL MOCK] Alerte envoyée à ${userEmail} pour ${senior.prenom}`)
      return
    }

    const subject = `⚠️ Sentinelle - Alerte : email suspect détecté pour ${senior.prenom}`
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #be123c;">Alerte Sentinelle</h1>
        <p>Un email suspect a été détecté dans la boîte de <strong>${senior.prenom}</strong>.</p>

        <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
          <tr>
            <td style="padding: 0.5rem; font-weight: bold;">Score de risque</td>
            <td style="padding: 0.5rem;">${analysis.score}/100</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; font-weight: bold;">Catégorie</td>
            <td style="padding: 0.5rem;">${analysis.categorie}</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; font-weight: bold;">Expéditeur</td>
            <td style="padding: 0.5rem;">${analysis.fromEmail}</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; font-weight: bold;">Objet</td>
            <td style="padding: 0.5rem;">${analysis.subject}</td>
          </tr>
        </table>

        <p><strong>Analyse :</strong> ${analysis.explication}</p>
        <p><strong>Conseil :</strong> ${analysis.conseilEnfant}</p>

        <a href="${env.APP_URL}/dashboard/emails/${analysis.id}"
           style="display: inline-block; padding: 0.75rem 1.5rem; background: #0f172a; color: white; text-decoration: none; border-radius: 0.5rem; margin-top: 1rem;">
          Voir le détail
        </a>
      </div>
    `

    const response = await fetch(`${this.baseUrl}/emails`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.MAIL_FROM,
        to: userEmail,
        subject,
        html,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Resend API error:', error)
    }
  }

  async sendOAuthInvite(seniorEmail: string, seniorPrenom: string, oauthUrl: string): Promise<void> {
    if (!this.apiKey) {
      console.log(`[EMAIL MOCK] Lien OAuth envoyé à ${seniorEmail} pour ${seniorPrenom}`)
      return
    }

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0f172a;">Protection Sentinelle</h1>
        <p>Bonjour ${seniorPrenom},</p>
        <p>Un de vos proches souhaite vous protéger contre les arnaques numériques avec Sentinelle.</p>
        <p>Cliquez sur le bouton ci-dessous pour autoriser Sentinelle à analyser vos emails Gmail en lecture seule :</p>
        <a href="${oauthUrl}"
           style="display: inline-block; padding: 0.75rem 1.5rem; background: #0f172a; color: white; text-decoration: none; border-radius: 0.5rem; margin: 1rem 0;">
          Activer la protection
        </a>
        <p style="color: #64748b; font-size: 0.875rem;">
          Sentinelle ne pourra ni lire ni modifier vos emails. Seules les métadonnées sont analysées.
        </p>
      </div>
    `

    await fetch(`${this.baseUrl}/emails`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.MAIL_FROM,
        to: seniorEmail,
        subject: `${seniorPrenom}, activez votre protection Sentinelle`,
        html,
      }),
    })
  }

  async sendWelcome(email: string, prenom: string): Promise<void> {
    if (!this.apiKey) {
      console.log(`[EMAIL MOCK] Email de bienvenue envoyé à ${email}`)
      return
    }

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0f172a;">Bienvenue sur Sentinelle</h1>
        <p>Bonjour ${prenom},</p>
        <p>Merci de vous être inscrit. Vous pouvez dès maintenant ajouter un senior à protéger.</p>
        <a href="${env.APP_URL}/dashboard/seniors/ajouter"
           style="display: inline-block; padding: 0.75rem 1.5rem; background: #0f172a; color: white; text-decoration: none; border-radius: 0.5rem; margin: 1rem 0;">
          Ajouter un senior
        </a>
      </div>
    `

    await fetch(`${this.baseUrl}/emails`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.MAIL_FROM,
        to: email,
        subject: 'Bienvenue sur Sentinelle',
        html,
      }),
    })
  }
}
