<template>
  <AuthFormLayout>
    <h1>Connexion</h1>
    <form @submit.prevent="handleSubmit" class="form-grid">
      <label>
        Email
        <input type="email" v-model="email" required />
      </label>
      <label>
        Mot de passe
        <input type="password" v-model="password" required />
      </label>
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit" :disabled="loading">{{ loading ? 'Connexion...' : 'Se connecter' }}</button>
    </form>
    <p><NuxtLink to="/mot-de-passe-oublie">Mot de passe oublié ?</NuxtLink></p>
    <p>Nouveau sur Sentinelle ? <NuxtLink to="/inscription">Inscription</NuxtLink></p>
  </AuthFormLayout>
</template>

<script setup lang="ts">
import AuthFormLayout from '~/components/AuthFormLayout.vue'
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()
const { login } = useAuth()

const handleSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    await login(email.value, password.value)
    router.push('/dashboard')
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-grid { display: grid; gap: 1rem; }
label { display: grid; gap: 0.35rem; font-weight: 500; }
input { padding: 0.75rem; border: 1px solid #cbd5e1; border-radius: 0.5rem; }
button { padding: 0.85rem 1.25rem; border: none; background: #0f172a; color: white; border-radius: 0.75rem; cursor: pointer; }
button:disabled { opacity: 0.6; cursor: not-allowed; }
.error { color: #be123c; font-size: 0.9rem; }
</style>
