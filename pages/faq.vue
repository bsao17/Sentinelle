<template>
  <div class="page-content">
    <div class="page-header">
      <h1>FAQ</h1>
      <p class="page-subtitle">Les questions les plus fréquentes sur Sentinelle</p>
    </div>
    <section class="faq-item">
      <h2>Comment Sentinelle protège-t-il un senior ?</h2>
      <p>Sentinelle analyse les emails entrants Gmail en lecture seule et alerte l'enfant aidant si un message présente un risque.</p>
    </section>
    <section class="faq-item">
      <h2>Le senior doit-il changer de compte Gmail ?</h2>
      <p>Non. Sentinelle fonctionne avec le compte Gmail actuel du senior via OAuth Google. Rien ne change pour lui.</p>
    </section>
    <section class="faq-item">
      <h2>Que stockez-vous réellement ?</h2>
      <p>Nous stockons uniquement les métadonnées d'analyse, pas le corps complet des emails. Les tokens OAuth sont chiffrés en AES-256.</p>
    </section>
    <section class="faq-item">
      <h2>Puis-je annuler à tout moment ?</h2>
      <p>Oui. L'annulation du compte supprime l'accès Gmail et purge toutes les données associées. Sans frais ni justificatif.</p>
    </section>
    <section class="faq-item">
      <h2>Le senior peut-il voir que je surveille ?</h2>
      <p>Non, la surveillance est invisible. Le senior autorise l'accès une fois, puis Sentinelle travaille en arrière-plan sans modifier sa boîte de réception.</p>
    </section>
    <section class="faq-item">
      <h2>Quel type d'arnaques sont détectées ?</h2>
      <p>Phishing, faux support technique, usurpation d'identité, arnaques aux sentiments, fausses factures, chantage, et plus encore.</p>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.page-content {
  display: grid;
  gap: var(--spacing-lg);
  max-width: 720px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
}
.page-header h1 {
  margin-bottom: var(--spacing-xs);
}
.page-subtitle {
  color: var(--text-secondary);
  font-size: var(--font-size-lg);
  margin: 0;
}

.faq-item {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  background: var(--surface);
  transition: box-shadow 0.15s ease;
}
.faq-item:hover {
  box-shadow: var(--shadow-md);
}
.faq-item h2 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
}
.faq-item p {
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.7;
}
</style>
