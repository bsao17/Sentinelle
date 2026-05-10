<template>
  <div class="dashboard-page">
    <DashboardNav />
    <h1>Paramètres</h1>
    <section class="settings-card">
      <h2>Seuil d'alerte par senior</h2>
      <p class="description">Au-delà de ce score (0-100), Sentinelle vous envoie une alerte par email.</p>
      <div v-if="seniors.length === 0" class="empty">Aucun senior configuré.</div>
      <div v-else class="settings-list">
        <article v-for="senior in seniors" :key="senior.id" class="setting-item">
          <div class="senior-info">
            <h3>{{ senior.prenom }}</h3>
            <span class="threshold-value">{{ senior.seuilAlerte }}</span>
          </div>
          <label class="slider-label">
            <span class="slider-min">0</span>
            <div class="slider-track">
              <input type="range" min="0" max="100" step="5"
                v-model.number="senior.seuilAlerte"
                @change="handleThresholdChange(senior.id, senior.seuilAlerte)" />
              <div class="slider-fill" :style="{ width: senior.seuilAlerte + '%' }"></div>
            </div>
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

const handleThresholdChange = async (id: string, seuil: number) => {
  await updateThreshold(id, seuil)
}
</script>

<style scoped>
.dashboard-page {
  padding: var(--spacing-md) 0;
}
.settings-card {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  border: 1px solid var(--border);
}
.settings-card h2 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-xs);
}
.description {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  margin: 0 0 var(--spacing-xl);
}
.settings-list {
  display: grid;
  gap: var(--spacing-md);
}
.setting-item {
  padding: var(--spacing-lg);
  background: var(--bg);
  border-radius: var(--radius);
  border: 1px solid var(--border);
}
.senior-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}
.senior-info h3 {
  margin: 0;
  font-size: var(--font-size-lg);
}
.threshold-value {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--primary);
  background: var(--primary-50);
  padding: 0.15rem 0.75rem;
  border-radius: var(--radius);
  min-width: 3rem;
  text-align: center;
}
.slider-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}
.slider-track {
  flex: 1;
  position: relative;
  height: 6px;
  background: var(--border);
  border-radius: 999px;
}
.slider-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--primary-light);
  border-radius: 999px;
  pointer-events: none;
}
.slider-min, .slider-max {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  font-weight: 600;
  width: 1.5rem;
  text-align: center;
}
input[type='range'] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  margin: 0;
}
.empty {
  color: var(--text-muted);
  padding: var(--spacing-xl) 0;
}
</style>
