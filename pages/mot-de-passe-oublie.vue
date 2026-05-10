<template>
  <AuthFormLayout>
    <h1>Mot de passe oublié</h1>
    <form @submit.prevent="handleSubmit" class="form-grid">
      <label>
        Email
        <input type="email" v-model="email" required placeholder="votre@email.fr" />
      </label>
      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit" :disabled="loading">{{ loading ? 'Envoi...' : 'Réinitialiser' }}</button>
    </form>
    <p><NuxtLink to="/connexion">Retour à la connexion</NuxtLink></p>
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
    // TODO: implement password reset via backend
    message.value = 'Si ce compte existe, un email de réinitialisation vous a été envoyé.'
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
.success { color: #15803d; font-size: 0.9rem; }
.error { color: #be123c; font-size: 0.9rem; }
</style>
