<template>
  <div class="app-shell">
    <header class="site-header">
      <nav>
        <div class="nav-left">
          <NuxtLink to="/" class="brand">Sentinelle</NuxtLink>
          <NuxtLink to="/comment-ca-marche">Comment ça marche</NuxtLink>
          <NuxtLink to="/tarifs">Tarifs</NuxtLink>
        </div>
        <div class="nav-right">
          <template v-if="isLoggedIn">
            <NuxtLink to="/dashboard">Dashboard</NuxtLink>
            <span class="user-email">{{ user?.email }}</span>
            <button @click="handleLogout" class="btn-logout">Déconnexion</button>
          </template>
          <template v-else>
            <NuxtLink to="/connexion">Se connecter</NuxtLink>
            <NuxtLink to="/inscription" class="btn-signup">S'inscrire</NuxtLink>
          </template>
        </div>
      </nav>
    </header>

    <main>
      <NuxtPage />
    </main>

    <footer class="site-footer">
      <div class="footer-links">
        <NuxtLink to="/mentions-legales">Mentions légales</NuxtLink>
        <NuxtLink to="/politique-confidentialite">Confidentialité</NuxtLink>
        <NuxtLink to="/faq">FAQ</NuxtLink>
        <NuxtLink to="/securite">Sécurité</NuxtLink>
      </div>
      <p class="footer-copy">Sentinelle — Protection des seniors contre les arnaques numériques.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { user, isLoggedIn, logout } = useAuth()
const router = useRouter()

const handleLogout = async () => {
  await logout()
  router.push('/')
}
</script>

<style scoped>
.app-shell { display: flex; min-height: 100vh; flex-direction: column; }
.site-header, .site-footer { padding: 1rem 2rem; background: #0f172a; color: white; }
.site-header { position: sticky; top: 0; z-index: 100; }
nav { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
.nav-left, .nav-right { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
.brand { font-weight: 800; font-size: 1.15rem; }
nav a { color: #f8fafc; text-decoration: none; font-size: 0.9rem; }
nav a:hover { color: #94a3b8; }
.user-email { font-size: 0.8rem; color: #94a3b8; }
.btn-logout { background: none; border: 1px solid #475569; color: #f8fafc; padding: 0.35rem 0.75rem; border-radius: 0.5rem; cursor: pointer; font-size: 0.85rem; }
.btn-logout:hover { background: #1e293b; }
.btn-signup { background: white; color: #0f172a !important; padding: 0.35rem 0.75rem; border-radius: 0.5rem; font-weight: 600; }
main { flex: 1; padding: 2rem; max-width: 1200px; width: 100%; margin: 0 auto; box-sizing: border-box; }
.footer-links { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 0.5rem; }
.footer-links a { color: #94a3b8; text-decoration: none; font-size: 0.85rem; }
.footer-copy { text-align: center; font-size: 0.85rem; color: #64748b; margin: 0; }
</style>
