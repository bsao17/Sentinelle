<template>
  <div class="dashboard-page">
    <DashboardNav />
    <h1>Emails analysés</h1>
    <p v-if="loading" class="loading">Chargement...</p>
    <div v-else-if="emails.length === 0" class="empty">Aucune analyse disponible pour le moment.</div>
    <ul v-else class="email-list">
      <li v-for="email in emails" :key="email.id">
        <NuxtLink :to="`/dashboard/emails/${email.id}`" class="email-link">
          <div class="email-main">
            <strong class="email-subject">{{ email.subject }}</strong>
            <span class="email-meta">{{ email.fromEmail }}</span>
          </div>
          <div class="email-right">
            <span class="email-date">{{ formatDate(email.dateReceived) }}</span>
            <span class="email-risk" :class="email.niveau">{{ email.niveau }}</span>
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
.dashboard-page {
  padding: var(--spacing-md) 0;
}
.email-list {
  list-style: none;
  padding: 0;
  margin: var(--spacing-lg) 0 0;
  display: grid;
  gap: var(--spacing-sm);
}
.email-list li {
  border-radius: var(--radius);
  overflow: hidden;
}
.email-link {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  color: var(--text);
  text-decoration: none;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: all 0.15s ease;
}
.email-link:hover {
  border-color: var(--primary-light);
  box-shadow: var(--shadow-md);
}
.email-main {
  flex: 1;
  min-width: 0;
}
.email-subject {
  display: block;
  font-size: var(--font-size-sm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.email-meta {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  margin-top: 0.15rem;
}
.email-right {
  text-align: right;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}
.email-date {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}
.email-risk {
  font-weight: 700;
  font-size: var(--font-size-xs);
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
}
.email-risk.danger { color: var(--danger); background: var(--danger-bg); }
.email-risk.suspect { color: var(--warning); background: var(--warning-bg); }
.email-risk.safe { color: var(--success); background: var(--success-bg); }
.loading, .empty { color: var(--text-muted); padding: var(--spacing-xl) 0; }
</style>
