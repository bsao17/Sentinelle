<template>
  <div class="page-content">
    <div class="page-header">
      <h1>Tarifs</h1>
      <p class="page-subtitle">Une offre simple et transparente pour protéger vos proches</p>
    </div>
    <section class="pricing-card">
      <div class="pricing-badge">Offre unique</div>
      <h2>Abonnement Sentinelle</h2>
      <p class="price">9,90 <span class="price-currency">&euro;</span><span class="price-period">/mois</span></p>
      <p class="price-desc">Par adresse Gmail surveillée. Paiement sécurisé via Stripe. Sans engagement.</p>
      <ul class="pricing-features">
        <li>&#10003; Surveillance Gmail en lecture seule</li>
        <li>&#10003; Alertes instantanées par email</li>
        <li>&#10003; Analyse IA pour chaque email reçu</li>
        <li>&#10003; Chiffrement AES-256 des tokens</li>
        <li>&#10003; Tableau de bord temps réel</li>
        <li>&#10003; Annulation à tout moment</li>
      </ul>
      <NuxtLink class="btn-primary" to="/inscription">S'inscrire</NuxtLink>
    </section>
    <section class="faq-section">
      <h2>Questions sur la facturation</h2>
      <p>Vous pouvez modifier, mettre en pause ou annuler votre abonnement depuis le tableau de bord. Aucun justificatif nécessaire.</p>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.page-content {
  display: grid;
  gap: var(--spacing-2xl);
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
  font-size: var(--font-size-lg);
  margin: 0;
}

.pricing-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl);
  background: var(--surface);
  box-shadow: var(--shadow-lg);
  text-align: center;
  position: relative;
}

.pricing-badge {
  position: absolute;
  top: -0.75rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent);
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 999px;
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.price {
  font-size: 3rem;
  font-weight: 800;
  color: var(--primary);
  margin: var(--spacing-md) 0;
}
.price-currency {
  font-size: 1.5rem;
  vertical-align: super;
}
.price-period {
  font-size: 1rem;
  font-weight: 400;
  color: var(--text-muted);
}
.price-desc {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xl);
}

.pricing-features {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--spacing-xl);
  display: grid;
  gap: var(--spacing-sm);
  text-align: left;
}
.pricing-features li {
  padding: var(--spacing-sm) 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  padding: 0.85rem 2rem;
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

.faq-section {
  text-align: center;
  padding: var(--spacing-xl);
  background: var(--primary-50);
  border-radius: var(--radius-lg);
}
.faq-section h2 {
  margin-bottom: var(--spacing-sm);
}
.faq-section p {
  color: var(--text-secondary);
  margin: 0;
}
</style>
