<template>
  <div class="app-shell">
    <header class="site-header">
      <nav>
        <NuxtLink to="/">Accueil</NuxtLink>
        <NuxtLink to="/comment-ca-marche">Comment ça marche</NuxtLink>
        <NuxtLink to="/tarifs">Tarifs</NuxtLink>
        <NuxtLink to="/inscription">S’inscrire</NuxtLink>
        <NuxtLink to="/connexion">Se connecter</NuxtLink>
      </nav>
    </header>

    <main>
      <NuxtPage />
    </main>

    <footer class="site-footer">
      <p>Sentinelle — Protection des seniors contre les arnaques numériques.</p>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-shell {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.site-header,
.site-footer {
  padding: 1rem 2rem;
  background: #0f172a;
  color: white;
}
nav {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
nav a {
  color: #f8fafc;
  text-decoration: none;
}
main {
  flex: 1;
  padding: 2rem;
}
.site-footer {
  text-align: center;
  font-size: 0.95rem;
}
</style>
