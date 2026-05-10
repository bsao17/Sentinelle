import appConfig from '@adonisjs/core/config/app'
import env from '#contracts/env'

export default appConfig({
  appKey: env.APP_KEY,
  http: {
    host: env.HOST,
    port: env.PORT,
  },
})
