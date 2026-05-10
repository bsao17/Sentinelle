import { apiFetch } from './api'

export const useSubscription = () => {
  const subscription = useState('subscription', () => ({
    id: '',
    status: 'inactive',
    plan: 'solo',
    currentPeriodEnd: null as string | null,
  }))

  const loading = ref(false)

  const fetchSubscription = async () => {
    loading.value = true
    try {
      const data: any = await apiFetch('/subscription')
      subscription.value = data.subscription
    } catch {
      // Keep default
    } finally {
      loading.value = false
    }
  }

  const activate = async (plan: string = 'solo', periodEnd?: string) => {
    loading.value = true
    try {
      const data: any = await apiFetch('/subscription/checkout', { method: 'POST' })
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        subscription.value = {
          id: data.subscription.id,
          status: data.subscription.status,
          plan: data.subscription.plan,
          currentPeriodEnd: data.subscription.currentPeriodEnd,
        }
      }
      return data
    } catch (e: any) {
      throw e
    } finally {
      loading.value = false
    }
  }

  const pause = async () => {
    loading.value = true
    try {
      const data: any = await apiFetch('/subscription/pause', { method: 'POST' })
      subscription.value.status = data.subscription.status
    } catch (e: any) {
      throw e
    } finally {
      loading.value = false
    }
  }

  const cancel = async () => {
    loading.value = true
    try {
      const data: any = await apiFetch('/subscription/cancel', { method: 'POST' })
      subscription.value.status = data.subscription.status
    } catch (e: any) {
      throw e
    } finally {
      loading.value = false
    }
  }

  // Auto-load on client
  if (process.client) {
    fetchSubscription()
  }

  return {
    subscription,
    loading,
    fetchSubscription,
    activate,
    pause,
    cancel,
  }
}
