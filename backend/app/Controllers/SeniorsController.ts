import { HttpContext } from '@adonisjs/core/http'
import { createSeniorValidator, updateSeniorValidator } from '#app/Validators/SeniorValidator'
import Senior from '#app/Models/Senior'
import EmailService from '#app/Services/EmailService'
import GmailService from '#app/Services/GmailService'

export default class SeniorsController {
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    const seniors = await Senior.query()
      .where('userId', user.id)
      .preload('emailAnalyses', (query) => query.orderBy('createdAt', 'desc').limit(5))
      .orderBy('createdAt', 'desc')

    return response.ok({ seniors })
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const payload = await createSeniorValidator.validate(request.all())

    const existing = await Senior.query()
      .where('userId', user.id)
      .where('gmail', payload.gmail)
      .first()

    if (existing) {
      return response.conflict({ error: 'Ce senior est déjà suivi' })
    }

    const senior = await Senior.create({
      ...payload,
      userId: user.id,
    })

    const gmailService = new GmailService()
    const oauthUrl = gmailService.getAuthUrl()

    const emailService = new EmailService()
    await emailService.sendOAuthInvite(senior.gmail, senior.prenom, oauthUrl)

    return response.created({ senior, oauthUrl })
  }

  async show({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const senior = await Senior.query()
      .where('id', params.id)
      .where('userId', user.id)
      .preload('emailAnalyses', (query) => query.orderBy('createdAt', 'desc').limit(20))
      .first()

    if (!senior) {
      return response.notFound({ error: 'Senior introuvable' })
    }

    return response.ok({ senior })
  }

  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const payload = await updateSeniorValidator.validate(request.all())

    const senior = await Senior.query()
      .where('id', params.id)
      .where('userId', user.id)
      .first()

    if (!senior) {
      return response.notFound({ error: 'Senior introuvable' })
    }

    senior.merge(payload)
    await senior.save()

    return response.ok({ senior })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.user!

    const senior = await Senior.query()
      .where('id', params.id)
      .where('userId', user.id)
      .first()

    if (!senior) {
      return response.notFound({ error: 'Senior introuvable' })
    }

    const gmailService = new GmailService()
    await gmailService.revokeAccess(senior)

    await senior.delete()

    return response.ok({ message: 'Senior supprimé' })
  }

  async getOAuthUrl({ auth, params, response }: HttpContext) {
    const user = auth.user!

    const senior = await Senior.query()
      .where('id', params.id)
      .where('userId', user.id)
      .first()

    if (!senior) {
      return response.notFound({ error: 'Senior introuvable' })
    }

    const gmailService = new GmailService()
    const url = gmailService.getAuthUrl()

    return response.ok({ oauthUrl: url })
  }
}
