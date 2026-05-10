<template>
  <div>
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
          <span class="value">9,90 € / mois</span>
        </div>
        <div class="detail-row" v-if="subscription.currentPeriodEnd">
          <span class="label">Fin de période</span>
          <span class="value">{{ formatDate(subscription.currentPeriodEnd) }}</span>
        </div>
      </div>
      <div class="button-group">
        <button v-if="subscription.status !== 'active'" @click="handleActivate" :disabled="activating">
          {{ activating ? 'Redirection...' : 'S\'abonner (9,90 €/mois)' }}
        </button>
        <button v-if="subscription.status === 'active'" @click="handlePause" class="btn-outline">
          Mettre en pause
        </button>
        <button v-if="subscription.status === 'active'" @click="handleCancel" class="btn-danger">
          Résilier
        </button>
        <button v-if="subscription.status === 'paused'" @click="handleActivate" :disabled="activating">
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
.subscription-card { background: #f8fafc; border-radius: 1rem; padding: 1.5rem; max-width: 500px; }
.status-badge { display: inline-block; padding: 0.35rem 0.75rem; border-radius: 0.5rem; font-weight: 700; font-size: 0.9rem; margin-bottom: 1.5rem; }
.status-badge.active { background: #f0fdf4; color: #15803d; }
.status-badge.paused { background: #fffbeb; color: #d97706; }
.status-badge.cancelled, .status-badge.inactive { background: #f1f5f9; color: #64748b; }
.details { display: grid; gap: 0.75rem; margin-bottom: 1.5rem; }
.detail-row { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; }
.label { color: #64748b; }
.value { font-weight: 600; }
.button-group { display: flex; gap: 1rem; flex-wrap: wrap; }
button { padding: 0.85rem 1rem; border: none; border-radius: 0.75rem; cursor: pointer; font-size: 0.9rem; background: #0f172a; color: white; }
button:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-outline { background: white; border: 1px solid #cbd5e1; color: #0f172a; }
.btn-danger { background: #fef2f2; color: #be123c; border: 1px solid #fecaca; }
.loading { color: #64748b; }
</style>
