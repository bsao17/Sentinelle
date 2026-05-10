<template>
  <nav class="dashboard-nav">
    <NuxtLink to="/dashboard" active-class="active">Synthèse</NuxtLink>
    <NuxtLink to="/dashboard/emails" active-class="active">Emails</NuxtLink>
    <NuxtLink to="/dashboard/seniors" active-class="active">Seniors</NuxtLink>
    <NuxtLink to="/dashboard/parametres" active-class="active">Paramètres</NuxtLink>
    <NuxtLink to="/dashboard/abonnement" active-class="active">Abonnement</NuxtLink>
  </nav>
</template>

<style scoped>
.dashboard-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.dashboard-nav a {
  text-decoration: none;
  color: #0f172a;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  background: #e2e8f0;
}
.dashboard-nav a.active {
  background: #0f172a;
  color: white;
}
</style>
