<template>
  <div class="page-content">
    <h1>Sécurité et RGPD</h1>
    <section>
      <h2>OAuth Google en lecture seule</h2>
      <p>Sentinelle utilise Google OAuth 2.0 pour accéder à Gmail avec le scope <code>gmail.readonly</code>. Le senior autorise explicitement l’accès et peut le révoquer à tout moment.</p>
    </section>
    <section>
      <h2>Chiffrement des tokens</h2>
      <p>Les tokens OAuth sont chiffrés en AES-256 avant stockage dans PostgreSQL. Nous n’utilisons pas ces tokens pour envoyer ou modifier des emails.</p>
    </section>
    <section>
      <h2>Données conservées</h2>
      <p>Sentinelle ne stocke pas le corps complet des emails. Seules les métadonnées utiles à l’analyse et le résultat du scoring sont enregistrés.</p>
    </section>
    <section>
      <h2>Droit à l’oubli</h2>
      <p>La suppression d’un compte entraine la révocation de l’accès Google et la purge des données associées.</p>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.page-content {
  display: grid;
  gap: 1.75rem;
}
code {
  background: #f1f5f9;
  padding: 0.2rem 0.4rem;
  border-radius: 0.35rem;
}
</style>
