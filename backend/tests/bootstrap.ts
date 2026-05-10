import { configure } from '@japa/runner'
import { apiClient } from '@japa/api-client'
import { assert } from '@japa/assert'

export const test = configure({
  files: ['tests/**/*.spec.ts'],
  plugins: [assert(), apiClient('http://localhost:4000')],
})
