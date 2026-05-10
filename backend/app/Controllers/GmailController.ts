import { HttpContext } from '@adonisjs/core/http'
import Senior from '#app/Models/Senior'
import GmailService from '#app/Services/GmailService'
import ClaudeService from '#app/Services/ClaudeService'
import EmailService from '#app/Services/EmailService'
import EmailAnalysis from '#app/Models/EmailAnalysis'
import User from '#app/Models/User'

export default class GmailController {
  async authorize({ auth, params, response }: HttpContext) {
    const user = auth.user!

    const senior = await Senior.query()
      .where('id', params.seniorId)
      .where('userId', user.id)
      .first()

    if (!senior) {
      return response.notFound({ error: 'Senior introuvable' })
    }

    const gmailService = new GmailService()
    const authUrl = gmailService.getAuthUrl()

    return response.ok({ authUrl })
  }

  async callback({ request, response }: HttpContext) {
    const code = request.input('code')
    const state = request.input('state')

    if (!code) {
      return response.badRequest({ error: 'Code OAuth manquant' })
    }

    // state contains the seniorId
    const senior = await Senior.find(state)
    if (!senior) {
      return response.badRequest({ error: 'Senior introuvable' })
    }

    try {
      const gmailService = new GmailService()
      await gmailService.handleCallback(code, senior)
      return response.redirect('/dashboard/seniors')
    } catch (error) {
      return response.badRequest({ error: 'Erreur lors de l\'autorisation Gmail' })
    }
  }

  async sync({ auth, params, response }: HttpContext) {
    const user = auth.user!

    const senior = await Senior.query()
      .where('id', params.seniorId)
      .where('userId', user.id)
      .first()

    if (!senior) {
      return response.notFound({ error: 'Senior introuvable' })
    }

    if (senior.oauthStatus !== 'active') {
      return response.badRequest({ error: 'Le senior n\'a pas autorisé Gmail' })
    }

    try {
      const gmailService = new GmailService()
      const claudeService = new ClaudeService()
      const emailService = new EmailService()

      const messages = await gmailService.fetchUnreadEmails(senior)
      const analyses: EmailAnalysis[] = []

      for (const msg of messages) {
        const data = gmailService.extractEmailData(msg)

        // Vérifier si déjà analysé
        const existing = await EmailAnalysis.query()
          .where('seniorId', senior.id)
          .where('gmailMessageId', data.messageId)
          .first()

        if (existing) continue

        // Analyser avec Claude
        const result = await claudeService.analyzeEmail(data.from, data.subject, data.snippet)

        const analysis = await EmailAnalysis.create({
          seniorId: senior.id,
          fromEmail: data.from,
          subject: data.subject,
          gmailMessageId: data.messageId,
          dateReceived: data.date,
          score: result.score,
          categorie: result.categorie,
          niveau: result.niveau,
          explication: result.explication,
          conseilEnfant: result.conseilEnfant,
          indicateurs: result.indicateurs,
          alerteEnvoyee: false,
        })

        analyses.push(analysis)

        // Envoyer alerte si score élevé
        if (result.score >= senior.seuilAlerte) {
          const user = await User.find(senior.userId)
          if (user) {
            await emailService.sendAlert(senior, analysis, user.email)
            analysis.alerteEnvoyee = true
            analysis.alerteEnvoyeeAt = new Date() as any
            await analysis.save()
          }
        }

        // Marquer comme lu
        await gmailService.markAsRead(senior, data.messageId)
      }

      return response.ok({ analyses })
    } catch (error) {
      return response.badRequest({ error: 'Erreur lors de la synchronisation' })
    }
  }

  async revoke({ auth, params, response }: HttpContext) {
    const user = auth.user!

    const senior = await Senior.query()
      .where('id', params.seniorId)
      .where('userId', user.id)
      .first()

    if (!senior) {
      return response.notFound({ error: 'Senior introuvable' })
    }

    const gmailService = new GmailService()
    await gmailService.revokeAccess(senior)

    return response.ok({ message: 'Accès Gmail révoqué' })
  }
}
