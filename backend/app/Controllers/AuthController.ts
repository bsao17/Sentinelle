import { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '#app/Validators/RegisterValidator'
import { loginValidator } from '#app/Validators/LoginValidator'
import User from '#app/Models/User'
import EmailService from '#app/Services/EmailService'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const payload = await registerValidator.validate(request.all())

    const existing = await User.findBy('email', payload.email)
    if (existing) {
      return response.conflict({ error: 'Cet email est déjà utilisé' })
    }

    const user = await User.create(payload)

    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: '30 days',
    })

    const emailService = new EmailService()
    await emailService.sendWelcome(user.email, user.prenom || 'Utilisateur')

    return response.created({
      user: {
        id: user.id,
        email: user.email,
        prenom: user.prenom,
        nom: user.nom,
      },
      token: token.value?.release(),
    })
  }

  async login({ request, response }: HttpContext) {
    const payload = await loginValidator.validate(request.all())

    const user = await User.findBy('email', payload.email)
    if (!user) {
      return response.unauthorized({ error: 'Email ou mot de passe incorrect' })
    }

    try {
      await User.verifyCredentials(payload.email, payload.password)
    } catch {
      return response.unauthorized({ error: 'Email ou mot de passe incorrect' })
    }

    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: '30 days',
    })

    return response.ok({
      user: {
        id: user.id,
        email: user.email,
        prenom: user.prenom,
        nom: user.nom,
      },
      token: token.value?.release(),
    })
  }

  async me({ auth, response }: HttpContext) {
    const user = auth.user!
    return response.ok({
      id: user.id,
      email: user.email,
      prenom: user.prenom,
      nom: user.nom,
    })
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return response.ok({ message: 'Déconnecté' })
  }
}
