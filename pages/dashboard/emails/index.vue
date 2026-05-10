<template>
  <div>
    <DashboardNav />
    <h1>Emails analysés</h1>
    <div v-if="emails.length === 0">Aucune analyse disponible pour le moment.</div>
    <ul class="email-list" v-else>
      <li v-for="email in emails" :key="email.id">
        <NuxtLink :to="`/dashboard/emails/${email.id}`">
          <strong>{{ email.subject }}</strong>
          <span>{{ email.dateReceived }}</span>
          <span class="risk">{{ email.niveau }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import DashboardNav from '~/components/DashboardNav.vue'
const { emails } = useEmails()
</script>

<style scoped>
.email-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: grid;
  gap: 1rem;
}
.email-list li {
  background: #f8fafc;
  border-radius: 1rem;
  padding: 1rem;
}
.email-list a {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: #0f172a;
  text-decoration: none;
}
.risk {
  font-weight: 700;
  color: #be123c;
}
</style>
