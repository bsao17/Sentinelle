<template>
  <div>
    <DashboardNav />
    <h1>Emails analysés</h1>
    <p v-if="loading" class="loading">Chargement...</p>
    <div v-else-if="emails.length === 0" class="empty">Aucune analyse disponible pour le moment.</div>
    <ul v-else class="email-list">
      <li v-for="email in emails" :key="email.id">
        <NuxtLink :to="`/dashboard/emails/${email.id}`">
          <div>
            <strong>{{ email.subject }}</strong>
            <span class="meta">{{ email.fromEmail }}</span>
          </div>
          <div class="right">
            <span class="date">{{ formatDate(email.dateReceived) }}</span>
            <span class="risk" :class="email.niveau">{{ email.niveau }}</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
import DashboardNav from '~/components/DashboardNav.vue'
const { emails, fetchEmails } = useEmails()
const loading = ref(true)

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

onMounted(async () => {
  await fetchEmails()
  loading.value = false
})
</script>

<style scoped>
.email-list { list-style: none; padding: 0; margin: 1rem 0 0; display: grid; gap: 0.75rem; }
.email-list li { background: #f8fafc; border-radius: 1rem; padding: 0; }
.email-list a { display: flex; justify-content: space-between; gap: 1rem; padding: 1rem; color: #0f172a; text-decoration: none; align-items: center; }
.meta { display: block; font-size: 0.85rem; color: #64748b; margin-top: 0.25rem; }
.right { text-align: right; flex-shrink: 0; }
.date { display: block; font-size: 0.8rem; color: #64748b; margin-bottom: 0.25rem; }
.risk { font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 0.35rem; font-size: 0.8rem; }
.risk.danger { color: #be123c; background: #fef2f2; }
.risk.suspect { color: #d97706; background: #fffbeb; }
.risk.safe { color: #15803d; background: #f0fdf4; }
.loading, .empty { color: #64748b; padding: 1rem 0; }
</style>
