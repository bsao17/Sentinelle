<template>
  <div>
    <DashboardNav />
    <h1>Tableau de bord</h1>
    <section class="summary-grid">
      <article>
        <h2>Seniors surveillés</h2>
        <p>{{ seniors.length }}</p>
      </article>
      <article>
        <h2>Alertes envoyées</h2>
        <p>{{ alertCount }}</p>
      </article>
      <article>
        <h2>Abonnement</h2>
        <p>{{ subscription.status }}</p>
      </article>
    </section>
    <section>
      <h2>Dernières analyses</h2>
      <ul class="mini-list">
        <li v-for="email in recentEmails" :key="email.id">
          <NuxtLink :to="`/dashboard/emails/${email.id}`">
            {{ email.subject }} — {{ email.niveau }}
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import DashboardNav from '~/components/DashboardNav.vue'
const { seniors } = useSenior()
const { emails } = useEmails()
const { subscription } = useSubscription()

const alertCount = computed(() => emails.value.filter((item) => item.alerteEnvoyee).length)
const recentEmails = computed(() => emails.value.slice(-5).reverse())
</script>

<style scoped>
.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin: 1rem 0 2rem;
}
article {
  padding: 1rem;
  background: #f8fafc;
  border-radius: 1rem;
}
.mini-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.mini-list li + li {
  margin-top: 0.75rem;
}
</style>
