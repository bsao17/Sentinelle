<template>
  <div class="dashboard-page">
    <DashboardNav />
    <div class="section-header">
      <h1>Seniors</h1>
      <NuxtLink to="/dashboard/seniors/ajouter" class="btn-add">+ Ajouter un senior</NuxtLink>
    </div>
    <p v-if="loading" class="loading">Chargement...</p>
    <div v-else-if="seniors.length === 0" class="empty">
      <p>Aucun senior ajouté pour le moment.</p>
      <NuxtLink to="/dashboard/seniors/ajouter" class="btn-primary">Ajouter un proche</NuxtLink>
    </div>
    <div v-else class="card-list">
      <article v-for="senior in seniors" :key="senior.id" class="senior-card">
        <div class="card-header">
          <div class="card-title">
            <h2>{{ senior.prenom }}</h2>
            <span class="oauth-status" :class="senior.oauthStatus">
              {{ statusLabel(senior.oauthStatus) }}
            </span>
          </div>
          <span class="status-dot" :class="senior.actif ? 'active' : 'inactive'"></span>
        </div>
        <div class="card-details">
          <div class="detail"><span class="detail-label">Email</span><span class="detail-value">{{ senior.gmail }}</span></div>
          <div class="detail"><span class="detail-label">Seuil d'alerte</span><span class="detail-value">{{ senior.seuilAlerte }}</span></div>
          <div class="detail"><span class="detail-label">Statut</span><span class="detail-value" :class="senior.actif ? 'text-success' : 'text-muted'">{{ senior.actif ? 'Actif' : 'En pause' }}</span></div>
          <div class="detail" v-if="senior.lastSyncAt"><span class="detail-label">Dernière synchro</span><span class="detail-value">{{ formatDate(senior.lastSyncAt) }}</span></div>
        </div>
        <div class="card-actions">
          <button @click="toggleActive(senior.id, !senior.actif)" class="btn-sm btn-outline">
            {{ senior.actif ? 'Mettre en pause' : 'Réactiver' }}
          </button>
          <button @click="handleSync(senior.id)" class="btn-sm btn-outline" :disabled="syncing === senior.id">
            {{ syncing === senior.id ? 'Synchro...' : 'Synchroniser' }}
          </button>
          <button @click="handleRemove(senior.id)" class="btn-sm btn-danger">Supprimer</button>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
import DashboardNav from '~/components/DashboardNav.vue'
const { seniors, fetchSeniors, setActive, removeSenior, syncGmail } = useSenior()
const syncing = ref<string | null>(null)
const loading = ref(true)

function statusLabel(status: string) {
  const labels: Record<string, string> = { active: 'OAuth OK', pending: 'En attente', revoked: 'Révoqué', expired: 'Expiré' }
  return labels[status] || status
}

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

const handleRemove = async (id: string) => {
  if (!confirm('Supprimer ce senior ? Cette action est irréversible.')) return
  await removeSenior(id)
}

const handleSync = async (id: string) => {
  syncing.value = id
  try {
    await syncGmail(id)
  } catch (e: any) {
    alert(e.message)
  } finally {
    syncing.value = null
  }
}

const toggleActive = async (id: string, actif: boolean) => {
  await setActive(id, actif)
}

onMounted(async () => {
  await fetchSeniors()
  loading.value = false
})
</script>

<style scoped>
.dashboard-page {
  padding: var(--spacing-md) 0;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}
.section-header h1 {
  margin: 0;
}

.btn-add {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 0.6rem 1.1rem;
  background: var(--primary);
  color: white;
  border-radius: var(--radius);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: 600;
  transition: all 0.15s ease;
}
.btn-add:hover {
  background: var(--primary-light);
  color: white;
}

.card-list {
  display: grid;
  gap: var(--spacing-lg);
}

.senior-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  background: var(--surface);
  box-shadow: var(--shadow);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}
.card-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}
.card-title h2 {
  margin: 0;
  font-size: var(--font-size-xl);
}

.status-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  flex-shrink: 0;
}
.status-dot.active { background: var(--success); }
.status-dot.inactive { background: var(--text-muted); }

.oauth-status {
  font-size: var(--font-size-xs);
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-weight: 600;
}
.oauth-status.active { background: var(--success-bg); color: var(--success); }
.oauth-status.pending { background: var(--warning-bg); color: var(--warning); }
.oauth-status.revoked { background: var(--danger-bg); color: var(--danger); }
.oauth-status.expired { background: var(--surface-hover); color: var(--text-muted); }

.card-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-sm) var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}
.detail {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.detail-label {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.detail-value {
  font-size: var(--font-size-sm);
  color: var(--text);
}
.text-success { color: var(--success); }
.text-muted { color: var(--text-muted); }

.card-actions {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border);
}
.btn-sm {
  padding: 0.45rem 0.8rem;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: var(--font-size-xs);
  font-weight: 600;
  font-family: var(--font-family);
  transition: all 0.15s ease;
}
.btn-sm:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-outline {
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
}
.btn-outline:hover { border-color: var(--primary-light); color: var(--primary); }
.btn-danger {
  border: 1px solid transparent;
  background: var(--danger-bg);
  color: var(--danger);
}
.btn-danger:hover { background: #fee2e2; }

.btn-primary {
  display: inline-flex;
  padding: 0.75rem 1.25rem;
  background: var(--primary);
  color: white;
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 600;
  font-size: var(--font-size-sm);
}

.loading, .empty {
  color: var(--text-muted);
  padding: var(--spacing-xl) 0;
  text-align: center;
}
.empty p {
  margin-bottom: var(--spacing-lg);
}
</style>
