<template>
  <div class="app-shell">
    <header class="site-header">
      <nav>
        <div class="nav-left">
          <NuxtLink to="/" class="brand">
            <span class="brand-icon">&#9724;</span>
            Sentinelle
          </NuxtLink>
          <NuxtLink to="/comment-ca-marche" class="nav-link">Comment ça marche</NuxtLink>
          <NuxtLink to="/tarifs" class="nav-link">Tarifs</NuxtLink>
          <NuxtLink to="/faq" class="nav-link">FAQ</NuxtLink>
        </div>
        <div class="nav-right">
          <template v-if="isLoggedIn">
            <NuxtLink to="/dashboard" class="nav-link">{{ user?.prenom || 'Dashboard' }}</NuxtLink>
            <button @click="handleLogout" class="btn-logout">Déconnexion</button>
          </template>
          <template v-else>
            <NuxtLink to="/connexion" class="nav-link">Se connecter</NuxtLink>
            <NuxtLink to="/inscription" class="btn-signup">S'inscrire</NuxtLink>
          </template>
        </div>
      </nav>
    </header>

    <main class="main-content">
      <NuxtPage />
    </main>

    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="brand-icon">&#9724;</span>
          <strong>Sentinelle</strong>
          <span class="footer-tagline">Protection des seniors contre les arnaques numériques</span>
        </div>
        <div class="footer-links">
          <NuxtLink to="/comment-ca-marche">Comment ça marche</NuxtLink>
          <NuxtLink to="/tarifs">Tarifs</NuxtLink>
          <NuxtLink to="/securite">Sécurité</NuxtLink>
          <NuxtLink to="/faq">FAQ</NuxtLink>
          <NuxtLink to="/mentions-legales">Mentions légales</NuxtLink>
          <NuxtLink to="/politique-confidentialite">Confidentialité</NuxtLink>
        </div>
        <p class="footer-copy">&copy; {{ new Date().getFullYear() }} Sentinelle. Tous droits réservés.</p>
      </div>
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
.app-shell {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.site-header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
  height: 64px;
  gap: var(--spacing-md);
}

.nav-left, .nav-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: 800;
  font-size: var(--font-size-lg);
  color: var(--primary) !important;
  text-decoration: none;
  letter-spacing: -0.02em;
}

.brand-icon {
  font-size: var(--font-size-xl);
  color: var(--accent);
}

.nav-link {
  color: var(--text-secondary) !important;
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: 500;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius);
  transition: all 0.15s ease;
}

.nav-link:hover {
  color: var(--primary) !important;
  background: var(--primary-50);
}

.btn-logout {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: 500;
  font-family: var(--font-family);
  transition: all 0.15s ease;
}

.btn-logout:hover {
  background: var(--surface-hover);
  color: var(--text);
}

.btn-signup {
  background: var(--primary);
  color: white !important;
  padding: 0.5rem 1.1rem;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: var(--font-size-sm);
  text-decoration: none;
  transition: all 0.15s ease;
}

.btn-signup:hover {
  background: var(--primary-light);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.main-content {
  flex: 1;
  padding: var(--spacing-xl);
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.site-footer {
  background: var(--primary);
  color: white;
  padding: var(--spacing-2xl) var(--spacing-xl);
  margin-top: var(--spacing-2xl);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: var(--spacing-lg);
  text-align: center;
}

.footer-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-lg);
}

.footer-tagline {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  font-size: var(--font-size-sm);
  margin-left: var(--spacing-sm);
}

.footer-links {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  flex-wrap: wrap;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: color 0.15s ease;
}

.footer-links a:hover {
  color: white;
}

.footer-copy {
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}
</style>
