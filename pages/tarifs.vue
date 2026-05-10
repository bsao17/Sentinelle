<template>
  <div class="page-content">
    <h1>Tarifs</h1>
    <section class="pricing-card">
      <h2>Abonnement Sentinelle</h2>
      <p class="price">9,90 € / mois</p>
      <p>Par adresse Gmail surveillée. Paiement récurrent sécurisé via Stripe.</p>
      <ul>
        <li>Surveillance Gmail en lecture seule</li>
        <li>Alertes instantanées sur email</li>
        <li>Analyse IA Claude pour chaque email</li>
        <li>Chiffrement AES-256 des tokens OAuth</li>
      </ul>
      <NuxtLink class="button primary" to="/inscription">S’inscrire</NuxtLink>
    </section>
    <section>
      <h2>Questions sur la facturation</h2>
      <p>Vous pouvez modifier ou annuler votre abonnement depuis le dashboard.</p>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.page-content {
  display: grid;
  gap: 2rem;
}
.pricing-card {
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  padding: 2rem;
  background: #f8fafc;
}
.price {
  font-size: 2rem;
  margin: 1rem 0;
}
ul {
  padding-left: 1.25rem;
}
.button {
  display: inline-flex;
  align-items: center;
  padding: 0.9rem 1.25rem;
  border-radius: 0.9rem;
  text-decoration: none;
  background: #0f172a;
  color: white;
}
</style>
