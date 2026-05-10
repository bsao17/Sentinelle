<template>
  <div class="dashboard-page">
    <DashboardNav />
    <h1>Ajouter un senior</h1>
    <p class="page-desc">Ajoutez un proche pour commencer à surveiller sa boîte Gmail.</p>
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
      <button type="submit" class="btn-submit" :disabled="loading">
        {{ loading ? 'Ajout en cours...' : "Ajouter et envoyer l'invitation" }}
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
.dashboard-page {
  padding: var(--spacing-md) 0;
}
.page-desc {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  margin: -0.5rem 0 var(--spacing-xl);
}
.form-grid {
  display: grid;
  gap: var(--spacing-md);
  max-width: 480px;
}
label {
  display: grid;
  gap: 0.35rem;
  font-weight: 500;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}
input {
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: var(--font-size-base);
  font-family: var(--font-family);
  transition: border-color 0.15s ease;
}
input:focus {
  border-color: var(--primary-light);
  outline: none;
  box-shadow: 0 0 0 3px var(--primary-100);
}
.btn-submit {
  padding: 0.85rem 1.25rem;
  border: none;
  background: var(--primary);
  color: white;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: var(--font-size-base);
  font-weight: 600;
  font-family: var(--font-family);
  transition: all 0.15s ease;
}
.btn-submit:hover {
  background: var(--primary-light);
}
.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.error {
  color: var(--danger);
  font-size: var(--font-size-sm);
  background: var(--danger-bg);
  padding: var(--spacing-sm);
  border-radius: var(--radius);
  margin: 0;
}
.success {
  color: var(--success);
  font-size: var(--font-size-sm);
  background: var(--success-bg);
  padding: var(--spacing-sm);
  border-radius: var(--radius);
  margin: 0;
}
</style>
