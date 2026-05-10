import { defineConfig } from '@adonisjs/drive'
import env from '#contracts/env'

export default defineConfig({
  disk: 'local',
  disks: {
    local: {
      driver: 'local',
      visibility: 'private',
      root: new URL('../tmp', import.meta.url),
    },
  },
})
