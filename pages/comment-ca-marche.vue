<template>
  <div class="page-content">
    <h1>Comment Sentinelle fonctionne</h1>
    <section>
      <h2>Mode A — Installation par l’enfant</h2>
      <ol>
        <li>L’enfant crée un compte sur Sentinelle.</li>
        <li>Il saisit le prénom et l’adresse Gmail du parent.</li>
        <li>Sentinelle envoie un lien unique au senior.</li>
        <li>Le senior autorise l’accès Gmail en lecture seule.</li>
        <li>La surveillance démarre automatiquement.</li>
      </ol>
    </section>

    <section>
      <h2>Mode B — Activation senior autonome</h2>
      <p>Le senior clique sur un lien, autorise Google OAuth et la protection s’active. L’enfant est ensuite notifié automatiquement.</p>
    </section>

    <section>
      <h2>Ce que fait Sentinelle</h2>
      <ul>
        <li>Récupère les nouveaux emails Gmail non lus.</li>
        <li>Analyse le contenu avec l’IA Claude.</li>
        <li>Calcule un score de risque et une catégorie.</li>
        <li>Envoie une alerte à l’enfant en cas de danger.</li>
      </ul>
    </section>

    <section>
      <h2>Sécurité et respect de la vie privée</h2>
      <p>Sentinelle ne stocke pas le corps des messages, seulement les métadonnées et le résultat de l’analyse.</p>
      <NuxtLink to="/securite" class="button secondary">En savoir plus</NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.page-content {
  display: grid;
  gap: 2rem;
  padding: 2rem 0;
}
button, .button {
  display: inline-flex;
  align-items: center;
  padding: 0.9rem 1.25rem;
  background: white;
  border: 1px solid #0f172a;
  color: #0f172a;
  border-radius: 0.9rem;
  text-decoration: none;
}
ol,
ul {
  padding-left: 1.25rem;
}
</style>
