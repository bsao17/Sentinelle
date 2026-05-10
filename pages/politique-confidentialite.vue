<template>
  <div class="page-content">
    <div class="page-header">
      <h1>Politique de confidentialité</h1>
      <p class="page-subtitle">Comment nous protégeons vos données personnelles</p>
    </div>
    <section class="legal-card">
      <h2>Informations collectées</h2>
      <p>Nous collectons uniquement les métadonnées d'analyse et les informations nécessaires au fonctionnement du service (comptes utilisateur, tokens OAuth chiffrés, paramètres de seuil).</p>
    </section>
    <section class="legal-card">
      <h2>Finalités</h2>
      <p>Les données sont utilisées pour analyser les emails, calculer un score de risque et envoyer des alertes à l'enfant aidant. Aucune utilisation commerciale.</p>
    </section>
    <section class="legal-card">
      <h2>Conservation</h2>
      <p>Les données sont conservées le temps nécessaire à la surveillance du compte. Les corps d'email ne sont jamais stockés sur nos serveurs.</p>
    </section>
    <section class="legal-card">
      <h2>Vos droits</h2>
      <p>Conformément au RGPD, vous pouvez demander la suppression de votre compte et la purge de vos données à tout moment.</p>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.page-content {
  display: grid;
  gap: var(--spacing-lg);
  max-width: 640px;
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
  margin: 0;
}

.legal-card {
  background: var(--surface);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
}
.legal-card h2 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
}
.legal-card p {
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.7;
}
</style>
