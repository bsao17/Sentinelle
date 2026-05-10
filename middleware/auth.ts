export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem('sentinelle_token')
  if (!token) {
    return navigateTo('/connexion')
  }
})
