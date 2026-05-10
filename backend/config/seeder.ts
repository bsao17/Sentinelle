import { defineConfig } from '@adonisjs/lucid/seeders'

export default defineConfig({
  default: 'pg',
  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER || 'sentinelle',
        password: process.env.DB_PASSWORD || 'sentinelle',
        database: process.env.DB_DATABASE || 'sentinelle',
      },
    },
  },
})
