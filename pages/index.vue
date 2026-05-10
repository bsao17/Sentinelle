<template>
  <div class="home-page">
    <section class="hero">
      <div>
        <p class="eyebrow">Protection seniors</p>
        <h1>Sentinelle surveille les emails de vos parents et détecte les arnaques en temps réel.</h1>
        <p>Un enfant aidant reçoit une alerte avant que le senior ne soit piégé. Aucun changement visible dans la boîte mail du senior.</p>
        <div class="hero-actions">
          <NuxtLink class="button primary" to="/inscription">Je protège un parent</NuxtLink>
          <NuxtLink class="button secondary" to="/comment-ca-marche">Comment ça marche</NuxtLink>
        </div>
      </div>
      <div class="hero-card">
        <p><strong>Analyse Gmail</strong> + IA + alertes par email</p>
        <ul>
          <li>Surveille les emails entrants en lecture seule</li>
          <li>Score de risque automatique</li>
          <li>Alerte l’enfant aidant uniquement</li>
        </ul>
      </div>
    </section>

    <section class="features">
      <article>
        <h2>Installation simple</h2>
        <p>L’enfant ajoute le parent et envoie un lien unique. Le senior autorise l’accès Gmail en quelques clics.</p>
      </article>
      <article>
        <h2>Surveillance discrète</h2>
        <p>La boîte mail du senior reste inchangée. Sentinelle analyse sans modifier les messages.</p>
      </article>
      <article>
        <h2>Sécurité et respect</h2>
        <p>OAuth Google, chiffrement AES-256, pas de stockage du corps d’email et hébergement EU.</p>
      </article>
    </section>

    <section class="cta-band">
      <h2>Donnez-vous la tranquillité d’esprit.</h2>
      <p>Avec Sentinelle, vous savez en temps réel si maman reçoit une arnaque.</p>
      <NuxtLink class="button primary" to="/inscription">Commencer maintenant</NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.home-page {
  display: grid;
  gap: 3rem;
}
.hero {
  display: grid;
  gap: 2rem;
  padding: 3rem 1rem;
  background: #f8fafc;
  border-radius: 1.5rem;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
}
.button {
  padding: 1rem 1.5rem;
  border-radius: 0.9rem;
  text-decoration: none;
  font-weight: 600;
}
.primary {
  background: #0f172a;
  color: white;
}
.secondary {
  background: white;
  color: #0f172a;
  border: 1px solid #cbd5e1;
}
.hero-card {
  background: white;
  padding: 1.75rem;
  border-radius: 1.25rem;
  border: 1px solid #e2e8f0;
}
.features {
  display: grid;
  gap: 1rem;
}
.features article {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
}
.cta-band {
  padding: 2rem;
  background: #0f172a;
  color: white;
  border-radius: 1.25rem;
  text-align: center;
}
</style>
