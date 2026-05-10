<template>
  <div class="center-page">
    <h1>Protéger mon Gmail</h1>
    <p>En un clic, autorisez Sentinelle à surveiller votre boîte Gmail en lecture seule.</p>
    <button @click="handleProtect">Autoriser Gmail</button>
    <p class="note">Vous serez redirigé vers Google pour donner votre consentement.</p>
  </div>
</template>

<script setup lang="ts">
const handleProtect = () => {
  // TODO: intégrer le flow OAuth Google ici
  alert('Redirection vers Google OAuth...')
}
</script>

<style scoped>
.center-page {
  max-width: 580px;
  margin: 3rem auto;
  text-align: center;
}
button {
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 0.85rem;
  background: #0f172a;
  color: white;
  cursor: pointer;
}
.note {
  margin-top: 1rem;
  color: #475569;
}
</style>
