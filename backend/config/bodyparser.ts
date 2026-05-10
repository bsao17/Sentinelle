import { defineConfig } from '@adonisjs/bodyparser'

export default defineConfig({
  allowedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  form: {
    convertEmptyStringsToNull: true,
    types: ['application/x-www-form-urlencoded'],
  },
  json: {
    convertEmptyStringsToNull: true,
    types: ['application/json', 'application/json; charset=utf-8'],
  },
  multipart: {
    autoProcess: true,
    convertEmptyStringsToNull: true,
    types: ['multipart/form-data'],
  },
})
