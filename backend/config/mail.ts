import { defineConfig } from '@adonisjs/mail'
import env from '#contracts/env'

export default defineConfig({
  mailer: 'resend',
  mailers: {
    resend: {
      driver: 'resend',
      apiKey: env.RESEND_API_KEY,
    },
    smtp: {
      driver: 'smtp',
      host: env.get('SMTP_HOST', 'localhost'),
      port: env.get('SMTP_PORT', 587),
      auth: {
        type: 'login',
        user: env.get('SMTP_USERNAME', ''),
        pass: env.get('SMTP_PASSWORD', ''),
      },
    },
  },
})
