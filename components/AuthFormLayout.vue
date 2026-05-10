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
  padding: 2rem;
}
.auth-card {
  width: min(520px, 100%);
  background: white;
  border-radius: 1rem;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
  padding: 2rem;
}
</style>
