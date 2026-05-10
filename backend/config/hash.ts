import { defineConfig } from '@adonisjs/hash'
import env from '#contracts/env'

export default defineConfig({
  default: env.HASH_DRIVER,
  list: {
    bcrypt: {
      driver: 'bcrypt',
      rounds: 10,
    },
  },
})
