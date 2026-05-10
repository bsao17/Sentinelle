export const useSubscription = () => {
  const subscription = useState('subscription', () => ({
    status: 'inactive',
    plan: 'solo',
    currentPeriodEnd: null as string | null
  }))

  const activate = async (plan: string, periodEnd: string) => {
    subscription.value = {
      status: 'active',
      plan,
      currentPeriodEnd: periodEnd
    }
  }

  const pause = async () => {
    subscription.value.status = 'paused'
  }

  const cancel = async () => {
    subscription.value.status = 'cancelled'
  }

  return {
    subscription,
    activate,
    pause,
    cancel
  }
}
