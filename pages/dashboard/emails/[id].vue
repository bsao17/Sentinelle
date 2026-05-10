<template>
  <div class="dashboard-page">
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
        <div class="field"><label>Catégorie</label><span>{{ analysis.categorie || 'Non catégorisé' }}</span></div>
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
.dashboard-page {
  padding: var(--spacing-md) 0;
}
.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: color 0.15s ease;
}
.back-link:hover {
  color: var(--primary);
}

.detail-card {
  background: var(--surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.header-risk {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-xl);
}
.header-risk.danger { background: var(--danger-bg); color: var(--danger); }
.header-risk.suspect { background: var(--warning-bg); color: var(--warning); }
.header-risk.safe { background: var(--success-bg); color: var(--success); }

.risk-badge {
  font-weight: 700;
  font-size: var(--font-size-lg);
  text-transform: capitalize;
}

.risk-score {
  font-weight: 600;
  font-size: var(--font-size-sm);
}

.fields {
  padding: var(--spacing-xl);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
}

.field {
  display: grid;
  gap: var(--spacing-xs);
}
.field.full {
  grid-column: 1 / -1;
}
.field label {
  font-weight: 600;
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.field span {
  font-size: var(--font-size-sm);
  color: var(--text);
}
.field p {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

.field p.conseil {
  background: var(--primary);
  color: white;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius);
}

ul {
  margin: 0;
  padding-left: var(--spacing-lg);
}
li + li {
  margin-top: var(--spacing-xs);
}
li {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.loading, .empty {
  color: var(--text-muted);
  padding: var(--spacing-xl) 0;
}
</style>
