<template>
  <section class="auth-layout">
    <div class="auth-card">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  padding: var(--spacing-xl);
}
.auth-card {
  width: min(520px, 100%);
  background: var(--surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  padding: var(--spacing-2xl);
}
</style>
