import { HttpContext } from '@adonisjs/core/http'
import Subscription from '#app/Models/Subscription'
import StripeService from '#app/Services/StripeService'
import stripeConfig from '#config/stripe'

export default class SubscriptionController {
  async show({ auth, response }: HttpContext) {
    const user = auth.user!

    let subscription = await Subscription.query()
      .where('userId', user.id)
      .first()

    if (!subscription) {
      subscription = await Subscription.create({
        userId: user.id,
        status: 'inactive',
        plan: 'solo',
      })
    }

    return response.ok({ subscription })
  }

  async createCheckout({ auth, response }: HttpContext) {
    const user = auth.user!

    if (!stripeConfig.secretKey) {
      // Mode mock : pas de Stripe configuré
      let subscription = await Subscription.query()
        .where('userId', user.id)
        .first()

      if (!subscription) {
        subscription = await Subscription.create({
          userId: user.id,
          status: 'active',
          plan: 'solo',
        })
      } else {
        subscription.status = 'active'
        subscription.plan = 'solo'
        await subscription.save()
      }

      return response.ok({ subscription, checkoutUrl: null })
    }

    const stripeService = new StripeService()
    const checkoutUrl = await stripeService.createCheckoutSession(
      user.id,
      user.email,
      stripeConfig.prices.solo || ''
    )

    return response.ok({ checkoutUrl })
  }

  async cancel({ auth, response }: HttpContext) {
    const user = auth.user!

    const subscription = await Subscription.query()
      .where('userId', user.id)
      .first()

    if (!subscription) {
      return response.notFound({ error: 'Aucun abonnement trouvé' })
    }

    subscription.status = 'cancelled'
    await subscription.save()

    return response.ok({ subscription })
  }

  async pause({ auth, response }: HttpContext) {
    const user = auth.user!

    const subscription = await Subscription.query()
      .where('userId', user.id)
      .first()

    if (!subscription) {
      return response.notFound({ error: 'Aucun abonnement trouvé' })
    }

    subscription.status = 'paused'
    await subscription.save()

    return response.ok({ subscription })
  }

  async webhook({ request, response }: HttpContext) {
    const payload = request.body()
    const signature = request.header('stripe-signature') || ''

    try {
      const stripeService = new StripeService()
      const event = await stripeService.constructWebhookEvent(
        JSON.stringify(payload),
        signature
      )

      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as any
          const subscription = await Subscription.create({
            userId: session.metadata.userId,
            stripeId: session.subscription,
            status: 'active',
            plan: 'solo',
          })
          await subscription.save()
          break
        }
        case 'customer.subscription.updated': {
          const sub = event.data.object as any
          const existing = await Subscription.findBy('stripeId', sub.id)
          if (existing) {
            existing.status = sub.status
            await existing.save()
          }
          break
        }
        case 'customer.subscription.deleted': {
          const deleted = event.data.object as any
          const existing = await Subscription.findBy('stripeId', deleted.id)
          if (existing) {
            existing.status = 'cancelled'
            await existing.save()
          }
          break
        }
      }

      return response.ok({ received: true })
    } catch (error) {
      return response.badRequest({ error: 'Webhook signature verification failed' })
    }
  }
}
