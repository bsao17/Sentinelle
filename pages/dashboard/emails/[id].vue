<template>
  <div>
    <DashboardNav />
    <NuxtLink to="/dashboard/emails" class="back-link">&larr; Retour aux emails</NuxtLink>
    <h1>Détail de l'analyse</h1>
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else-if="!analysis" class="empty">Analyse introuvable.</div>
    <div v-else class="detail-card">
      <div class="header-risk" :class="analysis.niveau">
        <span class="risk-badge">{{ analysis.niveau }}</span>
        <span class="risk-score">Score : {{ analysis.score }}/100</span>
      </div>
      <div class="fields">
        <div class="field"><label>Objet</label><span>{{ analysis.subject }}</span></div>
        <div class="field"><label>Expéditeur</label><span>{{ analysis.fromEmail }}</span></div>
        <div class="field"><label>Date</label><span>{{ formatDate(analysis.dateReceived) }}</span></div>
        <div class="field"><label>Catégorie</label><span>{{ analysis.categorie }}</span></div>
        <div v-if="analysis.explication" class="field full"><label>Analyse</label><p>{{ analysis.explication }}</p></div>
        <div v-if="analysis.conseilEnfant" class="field full"><label>Conseil</label><p class="conseil">{{ analysis.conseilEnfant }}</p></div>
        <div v-if="analysis.indicateurs?.length" class="field full">
          <label>Indicateurs</label>
          <ul>
            <li v-for="ind in analysis.indicateurs" :key="ind">{{ ind }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
import DashboardNav from '~/components/DashboardNav.vue'
const route = useRoute()
const { getById, fetchEmails } = useEmails()
const analysis = ref<any>(null)
const loading = ref(true)

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

onMounted(async () => {
  await fetchEmails()
  analysis.value = getById(String(route.params.id))
  loading.value = false
})
</script>

<style scoped>
.back-link { display: inline-block; margin-bottom: 0.5rem; color: #0f172a; }
.detail-card { background: #f8fafc; border-radius: 1rem; overflow: hidden; }
.header-risk { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; }
.header-risk.danger { background: #fef2f2; color: #be123c; }
.header-risk.suspect { background: #fffbeb; color: #d97706; }
.header-risk.safe { background: #f0fdf4; color: #15803d; }
.risk-badge { font-weight: 700; font-size: 1.1rem; }
.risk-score { font-weight: 600; }
.fields { padding: 1.5rem; display: grid; gap: 1rem; }
.field { display: grid; gap: 0.25rem; }
.field.full { grid-column: 1 / -1; }
.field label { font-weight: 600; font-size: 0.85rem; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; }
.field.conseil { background: #0f172a; color: white; padding: 0.75rem; border-radius: 0.5rem; }
ul { margin: 0; padding-left: 1.25rem; }
li + li { margin-top: 0.25rem; }
.loading, .empty { color: #64748b; padding: 1rem 0; }
</style>
