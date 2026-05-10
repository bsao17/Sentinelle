<template>
  <div class="center-page">
    <div class="confirm-card">
      <span class="confirm-icon">&#9989;</span>
      <h1>Activation confirmée</h1>
      <p>Votre accès Gmail a bien été autorisé. La surveillance de votre boîte est maintenant active.</p>
      <NuxtLink to="/dashboard" class="btn-dashboard">Accéder au tableau de bord</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.center-page {
  display: flex;
  justify-content: center;
  padding: var(--spacing-2xl);
}

.confirm-card {
  max-width: 480px;
  width: 100%;
  text-align: center;
  background: var(--surface);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border);
}

.confirm-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: var(--spacing-md);
}

.confirm-card h1 {
  margin-bottom: var(--spacing-md);
}

.confirm-card p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
  line-height: 1.7;
}

.btn-dashboard {
  display: inline-flex;
  padding: 0.9rem 1.5rem;
  background: var(--primary);
  color: white;
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.15s ease;
}
.btn-dashboard:hover {
  background: var(--primary-light);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
</style>
