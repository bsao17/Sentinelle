<template>
  <div class="center-page">
    <div class="protect-card">
      <span class="protect-icon">&#128274;</span>
      <h1>Protéger mon Gmail</h1>
      <p>Autorisez Sentinelle à surveiller votre boîte Gmail en lecture seule. En un clic, vous êtes protégé.</p>
      <button @click="handleProtect" class="btn-protect">Autoriser Gmail</button>
      <p class="note">Vous serez redirigé vers Google pour donner votre consentement</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleProtect = () => {
  alert('Redirection vers Google OAuth...')
}
</script>

<style scoped>
.center-page {
  display: flex;
  justify-content: center;
  padding: var(--spacing-2xl);
}

.protect-card {
  max-width: 480px;
  width: 100%;
  text-align: center;
  background: var(--surface);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border);
}

.protect-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: var(--spacing-md);
}

.protect-card h1 {
  margin-bottom: var(--spacing-md);
}

.protect-card p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
  line-height: 1.7;
}

.btn-protect {
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--radius);
  background: var(--primary);
  color: white;
  cursor: pointer;
  font-size: var(--font-size-base);
  font-weight: 600;
  font-family: var(--font-family);
  transition: all 0.15s ease;
}
.btn-protect:hover {
  background: var(--primary-light);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.note {
  margin-top: var(--spacing-lg);
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}
</style>
