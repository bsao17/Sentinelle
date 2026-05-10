<template>
  <div class="dashboard-page">
    <DashboardNav />
    <h1>Abonnement</h1>
    <p v-if="loading" class="loading">Chargement...</p>
    <section v-else class="subscription-card">
      <div class="status-badge" :class="subscription.status">
        {{ statusLabel }}
      </div>
      <div class="details">
        <div class="detail-row">
          <span class="label">Formule</span>
          <span class="value">{{ subscription.plan === 'solo' ? 'Solo (1 Gmail)' : subscription.plan }}</span>
        </div>
        <div class="detail-row">
          <span class="label">Prix</span>
          <span class="value">9,90 &euro; / mois</span>
        </div>
        <div class="detail-row" v-if="subscription.currentPeriodEnd">
          <span class="label">Fin de période</span>
          <span class="value">{{ formatDate(subscription.currentPeriodEnd) }}</span>
        </div>
      </div>
      <div class="button-group">
        <button v-if="subscription.status !== 'active'" @click="handleActivate" :disabled="activating" class="btn-primary">
          {{ activating ? 'Redirection...' : "S'abonner (9,90 €/mois)" }}
        </button>
        <button v-if="subscription.status === 'active'" @click="handlePause" class="btn-outline">
          Mettre en pause
        </button>
        <button v-if="subscription.status === 'active'" @click="handleCancel" class="btn-danger">
          Résilier
        </button>
        <button v-if="subscription.status === 'paused'" @click="handleActivate" :disabled="activating" class="btn-primary">
          Reprendre l'abonnement
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
import DashboardNav from '~/components/DashboardNav.vue'
const { subscription, activate, pause, cancel, fetchSubscription } = useSubscription()
const loading = ref(true)
const activating = ref(false)

const statusLabel = computed(() => {
  const labels: Record<string, string> = { active: 'Actif', paused: 'En pause', cancelled: 'Résilié', inactive: 'Inactif' }
  return labels[subscription.value.status] || subscription.value.status
})

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const handleActivate = async () => {
  activating.value = true
  try {
    await activate()
  } catch (e: any) {
    alert(e.message)
  } finally {
    activating.value = false
  }
}

const handlePause = async () => {
  try {
    await pause()
  } catch (e: any) {
    alert(e.message)
  }
}

const handleCancel = async () => {
  if (!confirm('Êtes-vous sûr de vouloir résilier votre abonnement ?')) return
  try {
    await cancel()
  } catch (e: any) {
    alert(e.message)
  }
}

onMounted(async () => {
  await fetchSubscription()
  loading.value = false
})
</script>

<style scoped>
.dashboard-page {
  padding: var(--spacing-md) 0;
}
.subscription-card {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  max-width: 500px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.status-badge {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xl);
}
.status-badge.active { background: var(--success-bg); color: var(--success); }
.status-badge.paused { background: var(--warning-bg); color: var(--warning); }
.status-badge.cancelled, .status-badge.inactive { background: var(--surface-hover); color: var(--text-muted); }
.details {
  display: grid;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
}
.detail-row {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border);
}
.label { color: var(--text-secondary); font-size: var(--font-size-sm); }
.value { font-weight: 600; font-size: var(--font-size-sm); }
.button-group {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}
.btn-primary {
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: 600;
  font-family: var(--font-family);
  background: var(--primary);
  color: white;
  transition: all 0.15s ease;
}
.btn-primary:hover { background: var(--primary-light); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-outline {
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: 600;
  font-family: var(--font-family);
  background: var(--surface);
  color: var(--text-secondary);
  transition: all 0.15s ease;
}
.btn-outline:hover { border-color: var(--primary-light); color: var(--primary); }
.btn-danger {
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--danger-bg);
  border-radius: var(--radius);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: 600;
  font-family: var(--font-family);
  background: var(--danger-bg);
  color: var(--danger);
  transition: all 0.15s ease;
}
.btn-danger:hover { background: #fee2e2; }
.loading { color: var(--text-muted); }
</style>
