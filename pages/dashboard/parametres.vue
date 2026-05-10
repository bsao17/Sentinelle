<template>
  <div>
    <DashboardNav />
    <h1>Paramètres</h1>
    <section class="settings-card">
      <h2>Seuil d'alerte par senior</h2>
      <p class="description">Au-delà de ce score (0-100), Sentinelle vous envoie une alerte email.</p>
      <div v-if="seniors.length === 0" class="empty">Aucun senior configuré.</div>
      <div v-else class="settings-list">
        <article v-for="senior in seniors" :key="senior.id">
          <div class="senior-info">
            <h3>{{ senior.prenom }}</h3>
            <span class="threshold-value">{{ senior.seuilAlerte }}</span>
          </div>
          <label class="slider-label">
            <span class="slider-min">0</span>
            <input type="range" min="0" max="100" step="5"
              v-model.number="senior.seuilAlerte"
              @change="handleThresholdChange(senior.id, senior.seuilAlerte)" />
            <span class="slider-max">100</span>
          </label>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
import DashboardNav from '~/components/DashboardNav.vue'
const { seniors, updateThreshold } = useSenior()
const { user } = useAuth()

const handleThresholdChange = async (id: string, seuil: number) => {
  await updateThreshold(id, seuil)
}
</script>

<style scoped>
.settings-card { background: #f8fafc; border-radius: 1rem; padding: 1.5rem; }
.description { color: #64748b; font-size: 0.9rem; margin: 0.5rem 0 1.5rem; }
.settings-list { display: grid; gap: 1rem; }
article { padding: 1.25rem; background: white; border-radius: 0.75rem; border: 1px solid #e2e8f0; }
.senior-info { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
.senior-info h3 { margin: 0; }
.threshold-value { font-size: 1.5rem; font-weight: 700; color: #0f172a; background: #f1f5f9; padding: 0.25rem 0.75rem; border-radius: 0.5rem; }
.slider-label { display: flex; align-items: center; gap: 0.75rem; }
.slider-min, .slider-max { font-size: 0.8rem; color: #64748b; }
input[type='range'] { flex: 1; }
.empty { color: #64748b; }
</style>
