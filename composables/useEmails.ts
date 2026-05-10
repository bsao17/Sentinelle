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
}

export const useEmails = () => {
  const emails = useState<EmailAnalysis[]>('email-analyses', () => [])

  const addEmailAnalysis = (analysis: Omit<EmailAnalysis, 'id'>) => {
    emails.value.push({
      id: crypto.randomUUID(),
      ...analysis
    })
  }

  const getBySenior = (seniorId: string) => {
    return emails.value.filter((item) => item.seniorId === seniorId)
  }

  const getById = (id: string) => {
    return emails.value.find((item) => item.id === id) ?? null
  }

  return {
    emails,
    addEmailAnalysis,
    getBySenior,
    getById
  }
}
