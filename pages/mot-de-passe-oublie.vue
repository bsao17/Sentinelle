<template>
  <AuthFormLayout>
    <div class="auth-header">
      <h1>Mot de passe oublié</h1>
      <p class="auth-subtitle">Recevez un lien de réinitialisation par email</p>
    </div>
    <form @submit.prevent="handleSubmit" class="form-grid">
      <label>
        Email
        <input type="email" v-model="email" required placeholder="votre@email.fr" />
      </label>
      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit" class="btn-submit" :disabled="loading">{{ loading ? 'Envoi...' : 'Réinitialiser' }}</button>
    </form>
    <div class="auth-links">
      <p><NuxtLink to="/connexion">Retour à la connexion</NuxtLink></p>
    </div>
  </AuthFormLayout>
</template>

<script setup lang="ts">
import AuthFormLayout from '~/components/AuthFormLayout.vue'
const email = ref('')
const message = ref('')
const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  message.value = ''
  error.value = ''
  loading.value = true
  try {
    message.value = 'Si ce compte existe, un email de réinitialisation vous a été envoyé.'
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
.success { color: var(--success); font-size: var(--font-size-sm); background: var(--success-bg); padding: var(--spacing-sm); border-radius: var(--radius); margin: 0; }
.error { color: var(--danger); font-size: var(--font-size-sm); background: var(--danger-bg); padding: var(--spacing-sm); border-radius: var(--radius); margin: 0; }
.auth-links { text-align: center; margin-top: var(--spacing-lg); }
.auth-links p { font-size: var(--font-size-sm); }
</style>
