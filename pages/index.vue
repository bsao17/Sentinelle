<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-text">
        <span class="badge">Protection seniors</span>
        <h1>Surveillez les emails de vos parents et détectez les arnaques en temps réel</h1>
        <p class="hero-subtitle">Sentinelle analyse les emails Gmail de vos proches avec l'IA. Vous recevez une alerte avant que le senior ne soit piégé. Discret, sécurisé, efficace.</p>
        <div class="hero-actions">
          <NuxtLink class="btn-primary" to="/inscription">Je protège un parent</NuxtLink>
          <NuxtLink class="btn-secondary" to="/comment-ca-marche">Comment ça marche</NuxtLink>
        </div>
      </div>
      <div class="hero-card">
        <div class="hero-card-header">
          <span class="hero-card-icon">&#128274;</span>
          <span><strong>Analyse Gmail</strong> + IA + alertes</span>
        </div>
        <ul class="hero-card-list">
          <li>&#10003; Surveillance lecture seule</li>
          <li>&#10003; Score de risque automatique</li>
          <li>&#10003; Alerte discrète par email</li>
        </ul>
      </div>
    </section>

    <section class="features">
      <article class="feature-card">
        <div class="feature-icon">&#128187;</div>
        <h2>Installation simple</h2>
        <p>Ajoutez un proche en 30 secondes. Il reçoit un lien, autorise l'accès Gmail en un clic, et la protection démarre.</p>
      </article>
      <article class="feature-card">
        <div class="feature-icon">&#128065;</div>
        <h2>Surveillance discrète</h2>
        <p>La boîte mail du senior reste intacte. Sentinelle analyse sans rien modifier. Aucun changement visible.</p>
      </article>
      <article class="feature-card">
        <div class="feature-icon">&#128737;</div>
        <h2>Sécurité et confidentialité</h2>
        <p>OAuth Google, chiffrement AES-256, aucun stockage du corps des emails. Données hébergées en Europe.</p>
      </article>
    </section>

    <section class="cta-band">
      <h2>Tranquillité d'esprit pour toute la famille</h2>
      <p>Avec Sentinelle, vous savez en temps réel si un proche reçoit une tentative d'arnaque.</p>
      <NuxtLink class="btn-primary btn-large" to="/inscription">Commencer maintenant</NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.home-page {
  display: grid;
  gap: var(--spacing-2xl);
}

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
  padding: var(--spacing-2xl);
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--bg) 100%);
  border-radius: var(--radius-xl);
}

.hero-text h1 {
  font-size: var(--font-size-3xl);
  margin: var(--spacing-md) 0;
  color: var(--primary);
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0 0 var(--spacing-lg);
}

.badge {
  display: inline-block;
  background: var(--accent);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.hero-card {
  background: var(--surface);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border);
}

.hero-card-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-lg);
}

.hero-card-icon {
  font-size: 1.5rem;
}

.hero-card-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: var(--spacing-sm);
}

.hero-card-list li {
  padding: var(--spacing-sm) 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.feature-card {
  background: var(--surface);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
}

.feature-card h2 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}

.feature-card p {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.7;
  margin: 0;
}

.cta-band {
  padding: var(--spacing-2xl);
  background: linear-gradient(135deg, var(--primary) 0%, #0f4a7a 100%);
  color: white;
  border-radius: var(--radius-xl);
  text-align: center;
}

.cta-band h2 {
  color: white;
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-sm);
}

.cta-band p {
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xl);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  padding: 0.85rem 1.5rem;
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 600;
  font-size: var(--font-size-base);
  background: var(--primary);
  color: white;
  transition: all 0.15s ease;
}

.btn-primary:hover {
  background: var(--primary-light);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-large {
  padding: 1rem 2rem;
  font-size: var(--font-size-lg);
  background: white;
  color: var(--primary);
}

.btn-large:hover {
  background: var(--primary-50);
  color: var(--primary);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 0.85rem 1.5rem;
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 600;
  font-size: var(--font-size-base);
  background: var(--surface);
  color: var(--primary);
  border: 1px solid var(--border);
  transition: all 0.15s ease;
}

.btn-secondary:hover {
  background: var(--primary-50);
  border-color: var(--primary-light);
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
  }
  .features {
    grid-template-columns: 1fr;
  }
}
</style>
