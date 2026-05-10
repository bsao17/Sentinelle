<template>
  <div>
    <DashboardNav />
    <h1>Paramètres</h1>
    <section class="settings-card">
      <h2>Seuil d’alerte par senior</h2>
      <div v-if="seniors.length === 0">Aucun senior configuré.</div>
      <div v-else class="settings-list">
        <article v-for="senior in seniors" :key="senior.id">
          <h3>{{ senior.prenom }}</h3>
          <label>
            Seuil :
            <input type="range" min="0" max="100" step="5" v-model.number="senior.seuilAlerte" />
            {{ senior.seuilAlerte }}
          </label>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import DashboardNav from '~/components/DashboardNav.vue'
const { seniors } = useSenior()
</script>

<style scoped>
.settings-card {
  background: #f8fafc;
  border-radius: 1rem;
  padding: 1.5rem;
}
.settings-list {
  display: grid;
  gap: 1rem;
}
article {
  padding: 1rem;
  background: white;
  border-radius: 0.75rem;
}
label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
input[type='range'] {
  flex: 1;
}
</style>
