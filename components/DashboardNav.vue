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
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-xs);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}
.dashboard-nav a {
  text-decoration: none;
  color: var(--text-secondary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius);
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: all 0.15s ease;
}
.dashboard-nav a:hover {
  color: var(--primary);
  background: var(--primary-50);
}
.dashboard-nav a.active {
  background: var(--primary);
  color: white;
}
</style>
