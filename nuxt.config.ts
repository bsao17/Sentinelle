import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'Sentinelle',
      meta: [
        { name: 'description', content: 'Protection des seniors contre les arnaques numériques' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  css: [],
  modules: [],
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:4000/api',
        changeOrigin: true,
      },
    },
  },
})
