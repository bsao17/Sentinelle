<template>
  <div>
    <DashboardNav />
    <h1>Ajouter un senior</h1>
    <form @submit.prevent="handleSubmit" class="form-grid">
      <label>
        Prénom du senior
        <input type="text" v-model="prenom" required placeholder="Jean" />
      </label>
      <label>
        Adresse Gmail
        <input type="email" v-model="gmail" required placeholder="jean.dupont@gmail.com" />
      </label>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Ajout...' : 'Ajouter et envoyer l\'invitation' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
import DashboardNav from '~/components/DashboardNav.vue'
const prenom = ref('')
const gmail = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)
const { addSenior } = useSenior()
const router = useRouter()

const handleSubmit = async () => {
  error.value = ''
  success.value = ''
  loading.value = true
  try {
    const result = await addSenior(prenom.value, gmail.value)
    success.value = `Invitation envoyée à ${prenom.value} à l'adresse ${gmail.value}.`
    if (result.oauthUrl) {
      window.open(result.oauthUrl, '_blank', 'noopener,noreferrer')
    }
    prenom.value = ''
    gmail.value = ''
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-grid { display: grid; gap: 1rem; max-width: 480px; }
label { display: grid; gap: 0.35rem; font-weight: 500; }
input { padding: 0.75rem; border: 1px solid #cbd5e1; border-radius: 0.5rem; font-size: 1rem; }
button { padding: 0.85rem 1.25rem; border: none; background: #0f172a; color: white; border-radius: 0.75rem; cursor: pointer; }
button:disabled { opacity: 0.6; cursor: not-allowed; }
.error { color: #be123c; }
.success { color: #15803d; }
</style>
