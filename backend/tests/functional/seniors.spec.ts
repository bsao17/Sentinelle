import { test } from '@japa/runner'
import { ApiClient } from '@japa/api-client'

test.group('Seniors', () => {
  let token = ''

  test.beforeEach(async ({ client }: { client: ApiClient }) => {
    // Register and login
    const unique = Date.now()
    const register = await client.post('/api/auth/register').json({
      email: `seniors-test-${unique}@sentinelle.app`,
      password: 'password123',
      prenom: 'Test',
    })
    token = register.body().token
  })

  test('list seniors (empty)', async ({ client }: { client: ApiClient }) => {
    const response = await client
      .get('/api/seniors')
      .bearerToken(token)

    response.assertStatus(200)
    response.assertBodyContains({ seniors: [] })
  })

  test('create a senior', async ({ client }: { client: ApiClient }) => {
    const response = await client
      .post('/api/seniors')
      .bearerToken(token)
      .json({
        prenom: 'Micheline',
        gmail: 'micheline@test.com',
      })

    response.assertStatus(201)
    response.assertBodyContains({
      senior: { prenom: 'Micheline', gmail: 'micheline@test.com' },
    })
  })

  test('show a senior', async ({ client }: { client: ApiClient }) => {
    const create = await client
      .post('/api/seniors')
      .bearerToken(token)
      .json({ prenom: 'Roger', gmail: 'roger@test.com' })

    const response = await client
      .get(`/api/seniors/${create.body().senior.id}`)
      .bearerToken(token)

    response.assertStatus(200)
    response.assertBodyContains({
      senior: { prenom: 'Roger' },
    })
  })

  test('update a senior threshold', async ({ client }: { client: ApiClient }) => {
    const create = await client
      .post('/api/seniors')
      .bearerToken(token)
      .json({ prenom: 'Jean', gmail: 'jean@test.com' })

    const response = await client
      .patch(`/api/seniors/${create.body().senior.id}`)
      .bearerToken(token)
      .json({ seuilAlerte: 80 })

    response.assertStatus(200)
    response.assertBodyContains({
      senior: { seuilAlerte: 80 },
    })
  })

  test('delete a senior', async ({ client }: { client: ApiClient }) => {
    const create = await client
      .post('/api/seniors')
      .bearerToken(token)
      .json({ prenom: 'Marie', gmail: 'marie@test.com' })

    const response = await client
      .delete(`/api/seniors/${create.body().senior.id}`)
      .bearerToken(token)

    response.assertStatus(200)
  })
})
