<template>
  <div class="page-content">
    <div class="page-header">
      <h1>Comment Sentinelle fonctionne</h1>
      <p class="page-subtitle">Une protection en quelques clics, pour toute la famille</p>
    </div>

    <div class="steps-grid">
      <section class="step-card">
        <div class="step-number">1</div>
        <h2>L'enfant crée un compte</h2>
        <p>Inscrivez-vous sur Sentinelle en 30 secondes. Aucune information bancaire nécessaire pour commencer.</p>
      </section>
      <section class="step-card">
        <div class="step-number">2</div>
        <h2>Ajoutez un proche</h2>
        <p>Saisissez le prénom et l'adresse Gmail du senior à protéger. Un lien unique lui est envoyé automatiquement.</p>
      </section>
      <section class="step-card">
        <div class="step-number">3</div>
        <h2>Le senior autorise l'accès</h2>
        <p>Le parent clique sur le lien et autorise l'accès Gmail en lecture seule via Google OAuth. Simple et sécurisé.</p>
      </section>
      <section class="step-card">
        <div class="step-number">4</div>
        <h2>La surveillance démarre</h2>
        <p>Sentinelle analyse chaque nouvel email, calcule un score de risque et vous alerte en cas de danger. Vous êtes tranquille.</p>
      </section>
    </div>

    <section class="mode-b-section">
      <h2>Mode autonome</h2>
      <p>Le senior peut aussi activer la protection lui-même en cliquant sur un lien. L'enfant est ensuite notifié et peut suivre les alertes depuis son tableau de bord.</p>
    </section>

    <section class="security-note">
      <div class="security-icon">&#128737;</div>
      <div>
        <h2>Sécurité et respect de la vie privée</h2>
        <p>Sentinelle ne stocke pas le corps des messages, seulement les métadonnées et le résultat de l'analyse.</p>
        <NuxtLink to="/securite" class="btn-secondary">En savoir plus</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.page-content {
  display: grid;
  gap: var(--spacing-2xl);
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

.steps-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.step-card {
  background: var(--surface);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  position: relative;
}

.step-number {
  width: 2.5rem;
  height: 2.5rem;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
}

.step-card h2 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}

.step-card p {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.7;
  margin: 0;
}

.mode-b-section {
  padding: var(--spacing-xl);
  background: var(--primary-50);
  border-radius: var(--radius-lg);
  text-align: center;
}
.mode-b-section h2 {
  margin-bottom: var(--spacing-sm);
}
.mode-b-section p {
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.security-note {
  display: flex;
  gap: var(--spacing-lg);
  align-items: flex-start;
  padding: var(--spacing-xl);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}
.security-icon {
  font-size: 2rem;
  flex-shrink: 0;
}
.security-note h2 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}
.security-note p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 0.7rem 1.25rem;
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 600;
  font-size: var(--font-size-sm);
  background: var(--primary);
  color: white;
  transition: all 0.15s ease;
}
.btn-secondary:hover {
  background: var(--primary-light);
}

@media (max-width: 768px) {
  .steps-grid {
    grid-template-columns: 1fr;
  }
}
</style>
