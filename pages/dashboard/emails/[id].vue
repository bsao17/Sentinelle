<template>
  <div>
    <DashboardNav />
    <h1>Détail de l’analyse</h1>
    <div v-if="!analysis">Analyse introuvable.</div>
    <div v-else class="detail-card">
      <p><strong>Objet :</strong> {{ analysis.subject }}</p>
      <p><strong>De :</strong> {{ analysis.fromEmail }}</p>
      <p><strong>Date :</strong> {{ analysis.dateReceived }}</p>
      <p><strong>Score :</strong> {{ analysis.score }} / 100</p>
      <p><strong>Catégorie :</strong> {{ analysis.categorie }}</p>
      <p><strong>Niveau :</strong> {{ analysis.niveau }}</p>
      <p><strong>Explication :</strong> {{ analysis.explication }}</p>
      <p><strong>Conseil :</strong> {{ analysis.conseilEnfant }}</p>
      <p><strong>Indicateurs :</strong> {{ analysis.indicateurs.join(', ') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardNav from '~/components/DashboardNav.vue'
const route = useRoute()
const { getById } = useEmails()
const analysis = computed(() => getById(String(route.params.id)))
</script>

<style scoped>
.detail-card {
  background: #f8fafc;
  border-radius: 1rem;
  padding: 1.5rem;
  display: grid;
  gap: 0.75rem;
}
</style>
