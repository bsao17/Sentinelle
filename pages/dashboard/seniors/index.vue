<template>
  <div>
    <DashboardNav />
    <h1>Gestion des seniors</h1>
    <NuxtLink to="/dashboard/seniors/ajouter" class="button">+ Ajouter un senior</NuxtLink>
    <p v-if="loading" class="loading">Chargement...</p>
    <div v-else-if="seniors.length === 0" class="empty">Aucun senior ajouté pour le moment.</div>
    <div v-else class="card-list">
      <article v-for="senior in seniors" :key="senior.id" class="senior-card">
        <div class="card-header">
          <h2>{{ senior.prenom }}</h2>
          <span class="oauth-status" :class="senior.oauthStatus">
            {{ statusLabel(senior.oauthStatus) }}
          </span>
        </div>
        <p>Email surveillé : {{ senior.gmail }}</p>
        <p>Seuil d'alerte : {{ senior.seuilAlerte }}</p>
        <p>Status : <strong :class="senior.actif ? 'active' : 'inactive'">{{ senior.actif ? 'Actif' : 'En pause' }}</strong></p>
        <p v-if="senior.lastSyncAt">Dernière synchro : {{ formatDate(senior.lastSyncAt) }}</p>
        <div class="card-actions">
          <button @click="toggleActive(senior.id, !senior.actif)" class="btn-outline">
            {{ senior.actif ? 'Mettre en pause' : 'Réactiver' }}
          </button>
          <button @click="handleSync(senior.id)" class="btn-outline" :disabled="syncing === senior.id">
            {{ syncing === senior.id ? 'Synchro...' : 'Synchroniser' }}
          </button>
          <button @click="handleRemove(senior.id)" class="btn-danger">Supprimer</button>
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
.button { display: inline-flex; padding: 0.75rem 1rem; background: #0f172a; color: white; border-radius: 0.75rem; text-decoration: none; margin-bottom: 1rem; }
.card-list { display: grid; gap: 1rem; }
.senior-card { border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.25rem; background: white; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
.card-header h2 { margin: 0; }
.oauth-status { font-size: 0.8rem; padding: 0.2rem 0.5rem; border-radius: 0.35rem; font-weight: 600; }
.oauth-status.active { background: #f0fdf4; color: #15803d; }
.oauth-status.pending { background: #fffbeb; color: #d97706; }
.oauth-status.revoked { background: #fef2f2; color: #be123c; }
.active { color: #15803d; }
.inactive { color: #64748b; }
.card-actions { display: flex; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap; }
button { padding: 0.5rem 0.75rem; border: 1px solid #cbd5e1; background: white; border-radius: 0.5rem; cursor: pointer; font-size: 0.85rem; }
button:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-danger { border-color: #be123c; color: #be123c; }
.loading, .empty { color: #64748b; padding: 1rem 0; }
</style>
