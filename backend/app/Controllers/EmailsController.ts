import { HttpContext } from '@adonisjs/core/http'
import EmailAnalysis from '#app/Models/EmailAnalysis'
import Senior from '#app/Models/Senior'

export default class EmailsController {
  async index({ auth, response }: HttpContext) {
    const user = auth.user!

    const analyses = await EmailAnalysis.query()
      .whereHas('senior', (query) => {
        query.where('userId', user.id)
      })
      .preload('senior', (query) => query.select('prenom', 'gmail'))
      .orderBy('createdAt', 'desc')

    return response.ok({ analyses })
  }

  async show({ auth, params, response }: HttpContext) {
    const user = auth.user!

    const analysis = await EmailAnalysis.query()
      .where('id', params.id)
      .whereHas('senior', (query) => {
        query.where('userId', user.id)
      })
      .preload('senior', (query) => query.select('prenom', 'gmail'))
      .first()

    if (!analysis) {
      return response.notFound({ error: 'Analyse introuvable' })
    }

    return response.ok({ analysis })
  }

  async bySenior({ auth, params, response }: HttpContext) {
    const user = auth.user!

    const senior = await Senior.query()
      .where('id', params.seniorId)
      .where('userId', user.id)
      .first()

    if (!senior) {
      return response.notFound({ error: 'Senior introuvable' })
    }

    const analyses = await EmailAnalysis.query()
      .where('seniorId', senior.id)
      .orderBy('createdAt', 'desc')

    return response.ok({ analyses })
  }
}
