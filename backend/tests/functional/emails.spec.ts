import { test } from '@japa/runner'
import { ApiClient } from '@japa/api-client'

test.group('Emails', () => {
  let token = ''
  let seniorId = ''

  test.beforeEach(async ({ client }: { client: ApiClient }) => {
    const unique = Date.now()
    const register = await client.post('/api/auth/register').json({
      email: `emails-test-${unique}@sentinelle.app`,
      password: 'password123',
    })
    token = register.body().token

    const create = await client
      .post('/api/seniors')
      .bearerToken(token)
      .json({ prenom: 'Test', gmail: 'test@test.com' })

    seniorId = create.body().senior.id
  })

  test('list email analyses (empty)', async ({ client }: { client: ApiClient }) => {
    const response = await client
      .get('/api/emails')
      .bearerToken(token)

    response.assertStatus(200)
    response.assertBodyContains({ analyses: [] })
  })

  test('get email analyses by senior (empty)', async ({ client }: { client: ApiClient }) => {
    const response = await client
      .get(`/api/seniors/${seniorId}/emails`)
      .bearerToken(token)

    response.assertStatus(200)
    response.assertBodyContains({ analyses: [] })
  })
})
