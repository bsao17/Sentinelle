import { HttpContext } from '@adonisjs/core/http'
import { Authenticator } from '@adonisjs/auth'
import { AccessToken, AccessTokensUserProvider } from '@adonisjs/auth/access_tokens'
import User from '#app/Models/User'

declare module '@adonisjs/core/http' {
  interface HttpContext {
    auth: Authenticator<AccessTokensUserProvider<typeof User, AccessToken>>
  }
}

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: () => Promise<void>) {
    const auth = ctx.auth as Authenticator<AccessTokensUserProvider<typeof User, AccessToken>>

    if (!(await auth.check())) {
      return ctx.response.unauthorized({ error: 'Non authentifié' })
    }

    await next()
  }
}
