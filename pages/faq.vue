<template>
  <div class="page-content">
    <h1>FAQ</h1>
    <section class="faq-item">
      <h2>Comment Sentinelle protège-t-il un senior ?</h2>
      <p>Sentinelle analyse les emails entrants Gmail en lecture seule et alerte l’enfant aidant si un message présente un risque.</p>
    </section>
    <section class="faq-item">
      <h2>Le senior doit-il changer de compte Gmail ?</h2>
      <p>Non. Sentinelle fonctionne avec le compte Gmail actuel du senior via OAuth Google.</p>
    </section>
    <section class="faq-item">
      <h2>Que stockez-vous réellement ?</h2>
      <p>Nous stockons uniquement les métadonnées d’analyse, pas le corps complet des emails. Les tokens OAuth sont chiffrés.</p>
    </section>
    <section class="faq-item">
      <h2>Puis-je annuler à tout moment ?</h2>
      <p>Oui. L’annulation du compte supprime l’accès et purge les données associées.</p>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.page-content {
  display: grid;
  gap: 1.5rem;
}
.faq-item {
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.5rem;
}
</style>
