import { Ignitor } from '@adonisjs/core'
import { defineConfig } from '@adonisjs/core/ignitor'

const ignitor = new Ignitor(
  new URL('./', import.meta.url),
  defineConfig({})
)

ignitor.start().catch(console.error)
