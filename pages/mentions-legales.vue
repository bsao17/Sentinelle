<template>
  <div class="page-content">
    <div class="page-header">
      <h1>Mentions légales</h1>
    </div>
    <section class="legal-card">
      <h2>Identité</h2>
      <p><strong>Sentinelle</strong></p>
      <p>Service de protection des seniors contre les arnaques numériques.</p>
    </section>
    <section class="legal-card">
      <h2>Hébergement</h2>
      <p>Hetzner Online GmbH — Industriestr. 25, 91710 Gunzenhausen, Allemagne.</p>
    </section>
    <section class="legal-card">
      <h2>Contact</h2>
      <p>Email : <a href="mailto:contact@sentinelle.app">contact@sentinelle.app</a></p>
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
  margin: var(--spacing-xs) 0;
  line-height: 1.7;
}
</style>
