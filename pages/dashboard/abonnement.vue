<template>
  <div>
    <DashboardNav />
    <h1>Abonnement</h1>
    <section class="subscription-card">
      <p>Status actuel : <strong>{{ subscription.status }}</strong></p>
      <p>Formule : <strong>{{ subscription.plan }}</strong></p>
      <p v-if="subscription.currentPeriodEnd">Fin de période : {{ subscription.currentPeriodEnd }}</p>
      <div class="button-group">
        <button @click="activate('solo')">Activer abonnement solo</button>
        <button @click="pause">Mettre en pause</button>
        <button @click="cancel">Résilier</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import DashboardNav from '~/components/DashboardNav.vue'
const { subscription, activate, pause, cancel } = useSubscription()
</script>

<style scoped>
.subscription-card {
  background: #f8fafc;
  border-radius: 1rem;
  padding: 1.5rem;
}
.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}
button {
  padding: 0.85rem 1rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  background: #0f172a;
  color: white;
}
</style>
