<template>
  <div class="center-page">
    <h1>Activation confirmée</h1>
    <p>Votre accès Gmail a bien été autorisé. La surveillance de votre boîte est maintenant active.</p>
    <NuxtLink to="/dashboard" class="button">Accéder au tableau de bord</NuxtLink>
  </div>
</template>

<script setup lang="ts">
// Cette page est appelée après le callback OAuth Google réussi
// Le backend redirige ici après /api/gmail/callback
</script>

<style scoped>
.center-page { max-width: 580px; margin: 3rem auto; text-align: center; }
.button { display: inline-flex; padding: 0.9rem 1.25rem; background: #0f172a; color: white; border-radius: 0.9rem; text-decoration: none; margin-top: 1.5rem; }
</style>
