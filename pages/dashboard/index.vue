<template>
  <div class="dashboard-page">
    <DashboardNav />
    <div class="dashboard-header">
      <h1>Tableau de bord</h1>
      <p class="dashboard-welcome">Bienvenue sur votre espace Sentinelle</p>
    </div>
    <p v-if="loading" class="loading">Chargement...</p>
    <template v-else>
      <section class="summary-grid">
        <article class="stat-card">
          <div class="stat-icon">&#128101;</div>
          <div>
            <p class="stat-label">Seniors surveillés</p>
            <p class="stat-value">{{ seniors.length }}</p>
          </div>
        </article>
        <article class="stat-card">
          <div class="stat-icon">&#128276;</div>
          <div>
            <p class="stat-label">Alertes envoyées</p>
            <p class="stat-value">{{ alertCount }}</p>
          </div>
        </article>
        <article class="stat-card">
          <div class="stat-icon">&#128179;</div>
          <div>
            <p class="stat-label">Abonnement</p>
            <p class="stat-value" :class="subscription.status === 'active' ? 'text-success' : ''">
              {{ subscription.status === 'active' ? 'Actif' : subscription.status || 'Inactif' }}
            </p>
          </div>
        </article>
      </section>
      <section class="recent-section">
        <h2>Dernières analyses</h2>
        <ul v-if="recentEmails.length > 0" class="mini-list">
          <li v-for="email in recentEmails" :key="email.id">
            <NuxtLink :to="`/dashboard/emails/${email.id}`" class="email-item">
              <span class="email-subject">{{ email.subject }}</span>
              <span class="email-risk" :class="email.niveau">{{ email.niveau }}</span>
            </NuxtLink>
          </li>
        </ul>
        <p v-else class="empty">Aucune analyse pour le moment.</p>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
import DashboardNav from '~/components/DashboardNav.vue'
const { seniors } = useSenior()
const { emails } = useEmails()
const { subscription } = useSubscription()
const loading = ref(true)

const alertCount = computed(() => emails.value.filter((item: any) => item.alerteEnvoyee).length)
const recentEmails = computed(() => emails.value.slice(-5).reverse())

onMounted(() => {
  setTimeout(() => { loading.value = false }, 500)
})
</script>

<style scoped>
.dashboard-page {
  padding: var(--spacing-md) 0;
}
.dashboard-header {
  margin-bottom: var(--spacing-xl);
}
.dashboard-header h1 {
  margin-bottom: var(--spacing-xs);
}
.dashboard-welcome {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  margin: 0;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.stat-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  background: var(--surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.stat-icon {
  font-size: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  background: var(--primary-50);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-xs);
}

.stat-value {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--primary);
  margin: 0;
}

.text-success { color: var(--success); }

.recent-section h2 {
  margin-bottom: var(--spacing-md);
}

.mini-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: var(--spacing-sm);
}

.email-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--surface);
  border-radius: var(--radius);
  text-decoration: none;
  color: var(--text);
  border: 1px solid var(--border);
  transition: all 0.15s ease;
}
.email-item:hover {
  border-color: var(--primary-light);
  box-shadow: var(--shadow-md);
}

.email-subject {
  font-weight: 500;
  font-size: var(--font-size-sm);
}

.email-risk {
  font-weight: 700;
  font-size: var(--font-size-xs);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
}
.email-risk.danger { color: var(--danger); background: var(--danger-bg); }
.email-risk.suspect { color: var(--warning); background: var(--warning-bg); }
.email-risk.safe { color: var(--success); background: var(--success-bg); }

.loading, .empty {
  color: var(--text-muted);
  padding: var(--spacing-xl) 0;
}
</style>
