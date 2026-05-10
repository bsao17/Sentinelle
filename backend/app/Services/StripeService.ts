import Stripe from 'stripe'
import stripeConfig from '#config/stripe'

export default class StripeService {
  private stripe: Stripe

  constructor() {
    this.stripe = new Stripe(stripeConfig.secretKey || '', {
      apiVersion: '2024-06-20',
    })
  }

  async createCheckoutSession(userId: string, email: string, priceId: string): Promise<string> {
    const session = await this.stripe.checkout.sessions.create({
      customer_email: email,
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
      success_url: `${process.env.APP_URL || 'http://localhost:3000'}/dashboard/abonnement?success=true`,
      cancel_url: `${process.env.APP_URL || 'http://localhost:3000'}/dashboard/abonnement?canceled=true`,
    })

    return session.url || ''
  }

  async constructWebhookEvent(payload: string, signature: string): Promise<Stripe.Event> {
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      stripeConfig.webhookSecret || ''
    )
  }

  async handleSubscriptionCreated(subscription: Stripe.Subscription): Promise<{
    userId: string
    stripeId: string
    status: string
    currentPeriodEnd: number
  }> {
    const metadata = subscription.metadata
    return {
      userId: metadata.userId,
      stripeId: subscription.id,
      status: subscription.status,
      currentPeriodEnd: subscription.current_period_end,
    }
  }

  async handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<{
    stripeId: string
    status: string
    currentPeriodEnd: number
  }> {
    return {
      stripeId: subscription.id,
      status: subscription.status,
      currentPeriodEnd: subscription.current_period_end,
    }
  }
}
