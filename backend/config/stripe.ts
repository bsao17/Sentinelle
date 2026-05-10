import env from '#contracts/env'

export default {
  secretKey: env.STRIPE_SECRET_KEY,
  webhookSecret: env.STRIPE_WEBHOOK_SECRET,
  prices: {
    solo: env.STRIPE_PRICE_SOLO,
  },
}
