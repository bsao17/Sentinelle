<template>
  <AuthFormLayout>
    <h1>Inscription</h1>
    <form @submit.prevent="handleSubmit" class="form-grid">
      <label>
        Email
        <input type="email" v-model="email" required />
      </label>
      <label>
        Mot de passe
        <input type="password" v-model="password" required minlength="8" />
      </label>
      <button type="submit">Créer mon compte</button>
    </form>
    <p>
      Déjà client ? <NuxtLink to="/connexion">Connexion</NuxtLink>
    </p>
  </AuthFormLayout>
</template>

<script setup lang="ts">
import AuthFormLayout from '~/components/AuthFormLayout.vue'
const email = ref('')
const password = ref('')
const router = useRouter()
const { login } = useAuth()

const handleSubmit = async () => {
  await login(email.value, password.value)
  router.push('/dashboard')
}
</script>

<style scoped>
.form-grid {
  display: grid;
  gap: 1rem;
}
button {
  padding: 0.85rem 1.25rem;
  border: none;
  background: #0f172a;
  color: white;
  border-radius: 0.75rem;
  cursor: pointer;
}
</style>
