import { defineConfig } from '@adonisjs/lucid'
import env from '#contracts/env'

export default defineConfig({
  connection: env.DB_CONNECTION,
  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: env.DB_HOST,
        port: env.DB_PORT,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_DATABASE,
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})
