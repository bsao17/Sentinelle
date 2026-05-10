<template>
  <div class="page-content">
    <div class="page-header">
      <h1>Sécurité et RGPD</h1>
      <p class="page-subtitle">Votre tranquillité est notre priorité. Voici comment nous protégeons vos données.</p>
    </div>
    <section class="security-card">
      <div class="security-card-icon">&#128274;</div>
      <div>
        <h2>OAuth Google en lecture seule</h2>
        <p>Sentinelle utilise Google OAuth 2.0 avec le scope <code>gmail.readonly</code>. Le senior autorise explicitement l'accès et peut le révoquer à tout moment depuis son compte Google.</p>
      </div>
    </section>
    <section class="security-card">
      <div class="security-card-icon">&#128273;</div>
      <div>
        <h2>Chiffrement des tokens</h2>
        <p>Les tokens OAuth sont chiffrés en AES-256 avant stockage dans PostgreSQL. Ils ne sont jamais utilisés pour envoyer ou modifier des emails.</p>
      </div>
    </section>
    <section class="security-card">
      <div class="security-card-icon">&#128451;</div>
      <div>
        <h2>Données conservées</h2>
        <p>Sentinelle ne stocke pas le corps complet des emails. Seules les métadonnées utiles à l'analyse et le résultat du scoring sont conservés.</p>
      </div>
    </section>
    <section class="security-card">
      <div class="security-card-icon">&#128227;</div>
      <div>
        <h2>Droit à l'oubli</h2>
        <p>La suppression d'un compte entraîne la révocation de l'accès Google et la purge de toutes les données associées. Conforme au RGPD.</p>
      </div>
    </section>
    <section class="security-card">
      <div class="security-card-icon">&#127757;</div>
      <div>
        <h2>Hébergement en Europe</h2>
        <p>Les données sont hébergées sur des serveurs situés en Europe (Allemagne), garantissant une protection conforme aux réglementations européennes.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.page-content {
  display: grid;
  gap: var(--spacing-lg);
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

.security-card {
  display: flex;
  gap: var(--spacing-lg);
  align-items: flex-start;
  background: var(--surface);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  transition: box-shadow 0.15s ease;
}
.security-card:hover {
  box-shadow: var(--shadow-md);
}

.security-card-icon {
  font-size: 1.75rem;
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  background: var(--primary-50);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
}

.security-card h2 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
}

.security-card p {
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.7;
}

code {
  background: var(--primary-50);
  padding: 0.15rem 0.4rem;
  border-radius: 0.35rem;
  font-size: 0.9em;
  color: var(--primary);
}
</style>
