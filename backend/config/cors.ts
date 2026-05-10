import { defineConfig } from '@adonisjs/cors'
import env from '#contracts/env'

export default defineConfig({
  enabled: true,
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 86400,
})
