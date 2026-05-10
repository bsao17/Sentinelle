<template>
  <AuthFormLayout>
    <h1>Inscription</h1>
    <form @submit.prevent="handleSubmit" class="form-grid">
      <label>
        Prénom
        <input type="text" v-model="prenom" />
      </label>
      <label>
        Email
        <input type="email" v-model="email" required />
      </label>
      <label>
        Mot de passe
        <input type="password" v-model="password" required minlength="8" />
      </label>
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit" :disabled="loading">{{ loading ? 'Création...' : 'Créer mon compte' }}</button>
    </form>
    <p>Déjà client ? <NuxtLink to="/connexion">Connexion</NuxtLink></p>
  </AuthFormLayout>
</template>

<script setup lang="ts">
import AuthFormLayout from '~/components/AuthFormLayout.vue'
const email = ref('')
const password = ref('')
const prenom = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()
const { register } = useAuth()

const handleSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    await register(email.value, password.value, prenom.value)
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
button { padding: 0.85rem 1.25rem; border: none; background: #0f172a; color: white; border-radius: 0.75rem; cursor: pointer; }
button:disabled { opacity: 0.6; cursor: not-allowed; }
.error { color: #be123c; font-size: 0.9rem; }
</style>
