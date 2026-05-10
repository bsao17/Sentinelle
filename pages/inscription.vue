<template>
  <AuthFormLayout>
    <div class="auth-header">
      <h1>Inscription</h1>
      <p class="auth-subtitle">Créez votre compte pour protéger vos proches</p>
    </div>
    <form @submit.prevent="handleSubmit" class="form-grid">
      <label>
        Prénom
        <input type="text" v-model="prenom" placeholder="Votre prénom" />
      </label>
      <label>
        Email
        <input type="email" v-model="email" required placeholder="vous@email.fr" />
      </label>
      <label>
        Mot de passe
        <input type="password" v-model="password" required minlength="8" placeholder="8 caractères minimum" />
      </label>
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit" class="btn-submit" :disabled="loading">{{ loading ? 'Création...' : 'Créer mon compte' }}</button>
    </form>
    <div class="auth-links">
      <p>Déjà client ? <NuxtLink to="/connexion">Se connecter</NuxtLink></p>
    </div>
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
.auth-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}
.auth-header h1 {
  margin-bottom: var(--spacing-xs);
}
.auth-subtitle {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  margin: 0;
}
.form-grid { display: grid; gap: var(--spacing-md); }
label { display: grid; gap: 0.35rem; font-weight: 500; font-size: var(--font-size-sm); color: var(--text-secondary); }
input { padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius); font-size: var(--font-size-base); font-family: var(--font-family); transition: border-color 0.15s ease; }
input:focus { border-color: var(--primary-light); outline: none; box-shadow: 0 0 0 3px var(--primary-100); }
.btn-submit { padding: 0.85rem 1.25rem; border: none; background: var(--primary); color: white; border-radius: var(--radius); cursor: pointer; font-size: var(--font-size-base); font-weight: 600; font-family: var(--font-family); transition: all 0.15s ease; }
.btn-submit:hover { background: var(--primary-light); }
.btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
.error { color: var(--danger); font-size: var(--font-size-sm); background: var(--danger-bg); padding: var(--spacing-sm); border-radius: var(--radius); margin: 0; }
.auth-links { text-align: center; margin-top: var(--spacing-lg); }
.auth-links p { font-size: var(--font-size-sm); color: var(--text-secondary); }
</style>
