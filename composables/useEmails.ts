import { apiFetch } from './api'

export type EmailAnalysis = {
  id: string
  seniorId: string
  fromEmail: string
  subject: string
  dateReceived: string
  score: number
  categorie: string
  niveau: string
  explication: string
  conseilEnfant: string
  indicateurs: string[]
  alerteEnvoyee: boolean
  senior?: { prenom: string; gmail: string }
}

export const useEmails = () => {
  const emails = useState<EmailAnalysis[]>('email-analyses', () => [])
  const loading = ref(false)

  const fetchEmails = async () => {
    loading.value = true
    try {
      const data: any = await apiFetch('/emails')
      emails.value = data.analyses
    } catch {
      // Keep existing data
    } finally {
      loading.value = false
    }
  }

  const fetchBySenior = async (seniorId: string) => {
    loading.value = true
    try {
      const data: any = await apiFetch(`/seniors/${seniorId}/emails`)
      emails.value = data.analyses
      return data.analyses
    } catch (e: any) {
      throw e
    } finally {
      loading.value = false
    }
  }

  const getBySenior = (seniorId: string) => {
    return emails.value.filter((item) => item.seniorId === seniorId)
  }

  const getById = (id: string) => {
    return emails.value.find((item) => item.id === id) ?? null
  }

  // Auto-load on client
  if (process.client) {
    fetchEmails()
  }

  return {
    emails,
    loading,
    fetchEmails,
    fetchBySenior,
    getBySenior,
    getById,
  }
}
