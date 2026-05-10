export const useAuth = () => {
  const user = useState('auth-user', () => null as { email: string } | null)
  const isLoggedIn = computed(() => !!user.value)

  const login = async (email: string, password: string) => {
    // TODO: Appeler l'API d'authentification Adonis
    user.value = { email }
    return true
  }

  const logout = async () => {
    user.value = null
  }

  return {
    user,
    isLoggedIn,
    login,
    logout
  }
}
