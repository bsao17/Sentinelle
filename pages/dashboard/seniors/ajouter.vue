<template>
  <div>
    <DashboardNav />
    <h1>Ajouter un senior</h1>
    <form @submit.prevent="handleSubmit" class="form-grid">
      <label>
        Prénom
        <input type="text" v-model="prenom" required />
      </label>
      <label>
        Adresse Gmail
        <input type="email" v-model="gmail" required />
      </label>
      <button type="submit">Générer le lien OAuth</button>
    </form>
    <p v-if="message" class="info-message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import DashboardNav from '~/components/DashboardNav.vue'
const prenom = ref('')
const gmail = ref('')
const message = ref('')
const { addSenior } = useSenior()

const handleSubmit = async () => {
  await addSenior(prenom.value, gmail.value)
  message.value = `Le senior ${prenom.value} est ajouté. Le lien OAuth sera envoyé ensuite.`
  prenom.value = ''
  gmail.value = ''
}
</script>

<style scoped>
.form-grid {
  display: grid;
  gap: 1rem;
  max-width: 480px;
}
button {
  padding: 0.85rem 1.25rem;
  border: none;
  background: #0f172a;
  color: white;
  border-radius: 0.75rem;
  cursor: pointer;
}
.info-message {
  margin-top: 1rem;
  color: #334155;
}
</style>
