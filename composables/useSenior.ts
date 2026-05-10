import { apiFetch } from './api'

export type SeniorItem = {
  id: string
  prenom: string
  gmail: string
  actif: boolean
  seuilAlerte: number
  oauthStatus: string
  lastSyncAt: string | null
  createdAt: string
}

export const useSenior = () => {
  const seniors = useState<SeniorItem[]>('senior-list', () => [])
  const loading = ref(false)

  const fetchSeniors = async () => {
    loading.value = true
    try {
      const data: any = await apiFetch('/seniors')
      seniors.value = data.seniors
    } catch {
      // Keep existing data
    } finally {
      loading.value = false
    }
  }

  const addSenior = async (prenom: string, gmail: string) => {
    loading.value = true
    try {
      const data: any = await apiFetch('/seniors', {
        method: 'POST',
        body: JSON.stringify({ prenom, gmail }),
      })
      seniors.value.unshift(data.senior)
      return data
    } catch (e: any) {
      throw e
    } finally {
      loading.value = false
    }
  }

  const updateSenior = async (id: string, payload: Partial<SeniorItem>) => {
    loading.value = true
    try {
      const data: any = await apiFetch(`/seniors/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      })
      const index = seniors.value.findIndex((s) => s.id === id)
      if (index !== -1) {
        seniors.value[index] = data.senior
      }
      return data
    } catch (e: any) {
      throw e
    } finally {
      loading.value = false
    }
  }

  const removeSenior = async (id: string) => {
    loading.value = true
    try {
      await apiFetch(`/seniors/${id}`, { method: 'DELETE' })
      seniors.value = seniors.value.filter((s) => s.id !== id)
    } catch (e: any) {
      throw e
    } finally {
      loading.value = false
    }
  }

  const setActive = async (id: string, actif: boolean) => {
    await updateSenior(id, { actif } as any)
  }

  const updateThreshold = async (id: string, seuil: number) => {
    await updateSenior(id, { seuilAlerte: seuil } as any)
  }

  const syncGmail = async (seniorId: string) => {
    loading.value = true
    try {
      const data: any = await apiFetch(`/gmail/sync/${seniorId}`, { method: 'POST' })
      return data
    } catch (e: any) {
      throw e
    } finally {
      loading.value = false
    }
  }

  const getOAuthUrl = async (seniorId: string) => {
    const data: any = await apiFetch(`/gmail/authorize/${seniorId}`)
    return data.authUrl
  }

  // Auto-load on client
  if (process.client) {
    fetchSeniors()
  }

  return {
    seniors,
    loading,
    fetchSeniors,
    addSenior,
    updateSenior,
    removeSenior,
    setActive,
    updateThreshold,
    syncGmail,
    getOAuthUrl,
  }
}
