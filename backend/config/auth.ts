import { defineConfig } from '@adonisjs/auth'
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens'
import env from '#contracts/env'

const authConfig = defineConfig({
  default: 'api',
  guards: {
    api: {
      driver: 'access_tokens',
      provider: tokensUserProvider({
        model: () => import('#app/Models/User'),
        tokens: 'access_tokens',
      }),
    },
  },
})

export default authConfig
