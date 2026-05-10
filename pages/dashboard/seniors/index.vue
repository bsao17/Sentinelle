<template>
  <div>
    <DashboardNav />
    <h1>Gestion des seniors</h1>
    <div v-if="seniors.length === 0">Aucun senior ajouté pour le moment.</div>
    <div v-else class="card-list">
      <article v-for="senior in seniors" :key="senior.id" class="senior-card">
        <h2>{{ senior.prenom }}</h2>
        <p>Email surveillé : {{ senior.gmail }}</p>
        <p>Seuil d’alerte : {{ senior.seuilAlerte }}</p>
        <p>Status : <strong>{{ senior.actif ? 'Actif' : 'En pause' }}</strong></p>
        <button @click="toggleActive(senior.id, !senior.actif)">
          {{ senior.actif ? 'Mettre en pause' : 'Réactiver' }}
        </button>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardNav from '~/components/DashboardNav.vue'
const { seniors, setActive } = useSenior()

const toggleActive = (id: string, actif: boolean) => {
  setActive(id, actif)
}
</script>

<style scoped>
.card-list {
  display: grid;
  gap: 1rem;
}
.senior-card {
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1rem;
  background: white;
}
button {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border: none;
  background: #0f172a;
  color: white;
  border-radius: 0.75rem;
  cursor: pointer;
}
</style>
