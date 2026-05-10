import { apiFetch, setAuthToken, getAuthToken } from './api'

export const useAuth = () => {
  const user = useState('auth-user', () => null as { id: string; email: string; prenom: string | null; nom: string | null } | null)
  const isLoggedIn = computed(() => !!user.value)
  const loading = ref(false)

  const login = async (email: string, password: string) => {
    loading.value = true
    try {
      const data: any = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      setAuthToken(data.token)
      user.value = data.user
      return true
    } catch (e: any) {
      throw e
    } finally {
      loading.value = false
    }
  }

  const register = async (email: string, password: string, prenom?: string, nom?: string) => {
    loading.value = true
    try {
      const data: any = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, prenom, nom }),
      })
      setAuthToken(data.token)
      user.value = data.user
      return true
    } catch (e: any) {
      throw e
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' })
    } catch {
      // Ignore logout errors
    }
    setAuthToken(null)
    user.value = null
  }

  const fetchMe = async () => {
    const token = getAuthToken()
    if (!token) return
    try {
      const data: any = await apiFetch('/auth/me')
      user.value = data
    } catch {
      setAuthToken(null)
      user.value = null
    }
  }

  // Auto-restore session on load
  if (process.client) {
    fetchMe()
  }

  return {
    user,
    isLoggedIn,
    login,
    register,
    logout,
    fetchMe,
    loading,
  }
}
