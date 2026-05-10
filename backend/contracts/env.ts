import { Env } from '@adonisjs/core/env'

export default await Env.create(new URL('../', import.meta.url), {
  PORT: Env.schema.number(),
  HOST: Env.schema.string(),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  APP_KEY: Env.schema.string(),
  APP_URL: Env.schema.string(),

  DB_CONNECTION: Env.schema.string(),
  DB_HOST: Env.schema.string(),
  DB_PORT: Env.schema.number(),
  DB_USER: Env.schema.string(),
  DB_PASSWORD: Env.schema.string(),
  DB_DATABASE: Env.schema.string(),

  HASH_DRIVER: Env.schema.string(),

  STRIPE_SECRET_KEY: Env.schema.string.optional(),
  STRIPE_WEBHOOK_SECRET: Env.schema.string.optional(),
  STRIPE_PRICE_SOLO: Env.schema.string.optional(),

  GOOGLE_CLIENT_ID: Env.schema.string.optional(),
  GOOGLE_CLIENT_SECRET: Env.schema.string.optional(),
  GOOGLE_REDIRECT_URI: Env.schema.string.optional(),

  CLAUDE_API_KEY: Env.schema.string.optional(),
  CLAUDE_MODEL: Env.schema.string.optional(),

  RESEND_API_KEY: Env.schema.string.optional(),
  MAIL_FROM: Env.schema.string(),
})
