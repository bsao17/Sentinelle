<template>
  <div>
    <DashboardNav />
    <h1>Tableau de bord</h1>
    <p v-if="loading" class="loading">Chargement...</p>
    <section v-else class="summary-grid">
      <article>
        <h2>Seniors surveillés</h2>
        <p class="stat">{{ seniors.length }}</p>
      </article>
      <article>
        <h2>Alertes envoyées</h2>
        <p class="stat">{{ alertCount }}</p>
      </article>
      <article>
        <h2>Abonnement</h2>
        <p class="stat">{{ subscription.status === 'active' ? 'Actif' : subscription.status }}</p>
      </article>
    </section>
    <section>
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
import DashboardNav from '~/components/DashboardNav.vue'
const { seniors } = useSenior()
const { emails } = useEmails()
const { subscription } = useSubscription()
const loading = ref(true)

const alertCount = computed(() => emails.value.filter((item) => item.alerteEnvoyee).length)
const recentEmails = computed(() => emails.value.slice(-5).reverse())

onMounted(() => {
  setTimeout(() => { loading.value = false }, 500)
})
</script>

<style scoped>
.summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin: 1rem 0 2rem; }
article { padding: 1.5rem; background: #f8fafc; border-radius: 1rem; }
.stat { font-size: 2rem; font-weight: 700; margin-top: 0.5rem; }
.mini-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.75rem; }
.email-item { display: flex; justify-content: space-between; padding: 0.75rem 1rem; background: #f8fafc; border-radius: 0.75rem; text-decoration: none; color: #0f172a; }
.email-subject { font-weight: 500; }
.email-risk { font-weight: 700; }
.email-risk.danger { color: #be123c; }
.email-risk.suspect { color: #d97706; }
.email-risk.safe { color: #15803d; }
.loading, .empty { color: #64748b; padding: 1rem 0; }
</style>
