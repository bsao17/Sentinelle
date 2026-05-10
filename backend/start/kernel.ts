import server from '@adonisjs/core/services/server'
import { middlewareManager } from '@adonisjs/core/services'
import { HttpContext } from '@adonisjs/core/http'

server.use([
  () => import('@adonisjs/cors/cors_middleware'),
  () => import('@adonisjs/bodyparser/bodyparser_middleware'),
  () => import('@adonisjs/shield/shield_middleware'),
  () => import('@adonisjs/auth/access_tokens_auth_middleware'),
])

export const middleware = middlewareManager.register({
  auth: () => import('#app/Middleware/Auth'),
})

export const { handleServerError } = server
