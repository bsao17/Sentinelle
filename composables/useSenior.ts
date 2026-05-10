export type SeniorItem = {
  id: string
  prenom: string
  gmail: string
  actif: boolean
  seuilAlerte: number
}

export const useSenior = () => {
  const seniors = useState<SeniorItem[]>('senior-list', () => [])

  const addSenior = async (prenom: string, gmail: string) => {
    seniors.value.push({
      id: crypto.randomUUID(),
      prenom,
      gmail,
      actif: true,
      seuilAlerte: 60
    })
  }

  const setActive = (id: string, actif: boolean) => {
    const senior = seniors.value.find((item) => item.id === id)
    if (senior) senior.actif = actif
  }

  const updateThreshold = (id: string, seuil: number) => {
    const senior = seniors.value.find((item) => item.id === id)
    if (senior) senior.seuilAlerte = seuil
  }

  return {
    seniors,
    addSenior,
    setActive,
    updateThreshold
  }
}
